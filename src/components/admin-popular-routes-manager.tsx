"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type AdminPopularRoute = {
  id: string;
  from_city: string;
  to_city: string;
  distance: string;
  travel_time: string;
  base_fare: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

type NewRouteForm = {
  fromCity: string;
  toCity: string;
  distance: string;
  travelTime: string;
  baseFare: string;
  imageUrl: string;
  sortOrder: string;
};

const defaultForm: NewRouteForm = {
  fromCity: "",
  toCity: "",
  distance: "",
  travelTime: "",
  baseFare: "",
  imageUrl: "",
  sortOrder: "100",
};

export function AdminPopularRoutesManager() {
  const [routes, setRoutes] = useState<AdminPopularRoute[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingNewImage, setUploadingNewImage] = useState(false);
  const [uploadingRouteId, setUploadingRouteId] = useState<string | null>(null);
  const [newRoute, setNewRoute] = useState<NewRouteForm>(defaultForm);

  const uploadImageFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/popular-routes/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error ?? "Failed to upload image");
    }

    return data.imageUrl as string;
  };

  const loadRoutes = async () => {
    setLoading(true);
    const response = await fetch("/api/admin/popular-routes", { cache: "no-store" });
    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error ?? "Failed to load popular routes");
      setLoading(false);
      return;
    }

    setRoutes(data.routes ?? []);
    setMessage("");
    setLoading(false);
  };

  useEffect(() => {
    void loadRoutes();
  }, []);

  const updateRouteField = (id: string, key: keyof AdminPopularRoute, value: string | number | boolean) => {
    setRoutes((prev) => prev.map((route) => (route.id === id ? { ...route, [key]: value } : route)));
  };

  const saveRoute = async (route: AdminPopularRoute) => {
    const response = await fetch(`/api/admin/popular-routes/${route.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromCity: route.from_city,
        toCity: route.to_city,
        distance: route.distance,
        travelTime: route.travel_time,
        baseFare: route.base_fare,
        imageUrl: route.image_url,
        sortOrder: route.sort_order,
        isActive: route.is_active,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error ?? "Failed to save route");
      return;
    }

    setMessage(`Updated route: ${data.route.from_city} to ${data.route.to_city}`);
    await loadRoutes();
  };

  const deleteRoute = async (id: string) => {
    const response = await fetch(`/api/admin/popular-routes/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error ?? "Failed to delete route");
      return;
    }

    setMessage("Route deleted");
    await loadRoutes();
  };

  const addRoute = async () => {
    const response = await fetch("/api/admin/popular-routes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromCity: newRoute.fromCity,
        toCity: newRoute.toCity,
        distance: newRoute.distance,
        travelTime: newRoute.travelTime,
        baseFare: newRoute.baseFare,
        imageUrl: newRoute.imageUrl,
        sortOrder: Number(newRoute.sortOrder) || 100,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error ?? "Failed to add route");
      return;
    }

    setMessage(`Added route: ${data.route.from_city} to ${data.route.to_city}`);
    setNewRoute(defaultForm);
    await loadRoutes();
  };

  const handleNewImageSelected = async (file: File | null) => {
    if (!file) return;

    try {
      setUploadingNewImage(true);
      const imageUrl = await uploadImageFile(file);
      setNewRoute((prev) => ({ ...prev, imageUrl }));
      setMessage("Image uploaded for new route.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to upload image");
    } finally {
      setUploadingNewImage(false);
    }
  };

  const handleEditImageSelected = async (routeId: string, file: File | null) => {
    if (!file) return;

    try {
      setUploadingRouteId(routeId);
      const imageUrl = await uploadImageFile(file);
      updateRouteField(routeId, "image_url", imageUrl);
      setMessage("Image uploaded. Click Save to persist this route.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to upload image");
    } finally {
      setUploadingRouteId(null);
    }
  };

  return (
    <Card className="mt-6 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">Popular routes manager</h3>
        <Button variant="secondary" onClick={loadRoutes} disabled={loading}>
          {loading ? "Loading..." : "Refresh routes"}
        </Button>
      </div>

      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Admin can add destinations, set image URLs, re-order routes, and hide routes from public cards.
      </p>

      <div className="mt-4 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
        <p className="mb-3 text-sm font-semibold">Add new popular route</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            placeholder="From city"
            value={newRoute.fromCity}
            onChange={(event) => setNewRoute((prev) => ({ ...prev, fromCity: event.target.value }))}
          />
          <Input
            placeholder="To destination"
            value={newRoute.toCity}
            onChange={(event) => setNewRoute((prev) => ({ ...prev, toCity: event.target.value }))}
          />
          <Input
            placeholder="Distance (e.g. 280 km)"
            value={newRoute.distance}
            onChange={(event) => setNewRoute((prev) => ({ ...prev, distance: event.target.value }))}
          />
          <Input
            placeholder="Travel time (e.g. 5 hr 20 min)"
            value={newRoute.travelTime}
            onChange={(event) => setNewRoute((prev) => ({ ...prev, travelTime: event.target.value }))}
          />
          <Input
            placeholder="Fare (e.g. INR 8,400)"
            value={newRoute.baseFare}
            onChange={(event) => setNewRoute((prev) => ({ ...prev, baseFare: event.target.value }))}
          />
          <Input
            placeholder="Image URL"
            value={newRoute.imageUrl}
            onChange={(event) => setNewRoute((prev) => ({ ...prev, imageUrl: event.target.value }))}
          />
          <label className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm dark:border-slate-700">
            <input
              type="file"
              accept="image/*"
              className="w-full text-xs"
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null;
                void handleNewImageSelected(file);
              }}
            />
          </label>
          <Input
            type="number"
            placeholder="Sort order"
            value={newRoute.sortOrder}
            onChange={(event) => setNewRoute((prev) => ({ ...prev, sortOrder: event.target.value }))}
          />
          <Button onClick={addRoute} disabled={uploadingNewImage}>
            {uploadingNewImage ? "Uploading image..." : "Add route"}
          </Button>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {routes.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-slate-300">No admin routes configured yet.</p>
        ) : (
          routes.map((route) => (
            <div key={route.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                <Input
                  value={route.from_city}
                  onChange={(event) => updateRouteField(route.id, "from_city", event.target.value)}
                />
                <Input
                  value={route.to_city}
                  onChange={(event) => updateRouteField(route.id, "to_city", event.target.value)}
                />
                <Input
                  value={route.distance}
                  onChange={(event) => updateRouteField(route.id, "distance", event.target.value)}
                />
                <Input
                  value={route.travel_time}
                  onChange={(event) => updateRouteField(route.id, "travel_time", event.target.value)}
                />
                <Input
                  value={route.base_fare}
                  onChange={(event) => updateRouteField(route.id, "base_fare", event.target.value)}
                />
                <Input
                  value={route.image_url}
                  onChange={(event) => updateRouteField(route.id, "image_url", event.target.value)}
                />
                <label className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm dark:border-slate-700">
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full text-xs"
                    onChange={(event) => {
                      const file = event.target.files?.[0] ?? null;
                      void handleEditImageSelected(route.id, file);
                    }}
                  />
                </label>
                <Input
                  type="number"
                  value={String(route.sort_order)}
                  onChange={(event) => updateRouteField(route.id, "sort_order", Number(event.target.value) || 0)}
                />
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={route.is_active}
                    onChange={(event) => updateRouteField(route.id, "is_active", event.target.checked)}
                  />
                  Active
                </label>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" onClick={() => saveRoute(route)} disabled={uploadingRouteId === route.id}>
                  Save
                </Button>
                <Button size="sm" variant="danger" onClick={() => deleteRoute(route.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {message ? <p className="mt-4 text-sm text-emerald-700 dark:text-emerald-300">{message}</p> : null}
    </Card>
  );
}
