export type DriverKitLinks = {
  onboardingGuidePdf: string;
  onboardingGuideText: string;
  badge: string;
  video: string;
  benefits: string;
};

export function buildDriverKitLinks(baseUrl: string): DriverKitLinks {
  return {
    onboardingGuidePdf: `${baseUrl}/api/driver-kit/onboarding-pdf`,
    onboardingGuideText: `${baseUrl}/driver-kit/safesobati-driver-onboarding-guide.txt`,
    badge: `${baseUrl}/driver-kit/verified-driver-partner-badge.svg`,
    video: `${baseUrl}/driver-benefits/video`,
    benefits: `${baseUrl}/driver-benefits`,
  };
}

export function buildDriverKitWelcomeMessage(driverName: string, links: DriverKitLinks): string {
  return `🚖 Welcome to SafeSobati Partner Network\n\nThank you for joining SafeSobati — trusted local rides for Maharashtra.\n\nCongratulations ${driverName}, your profile is now approved.\n\nCustomers can now:\n✅ View your vehicle\n✅ See your ratings\n✅ Send ride enquiries\n✅ Book trusted trips\n\nPlease keep your:\n- vehicle clean\n- documents valid\n- response time fast\n\nDriver Kit links:\nOnboarding guide (PDF): ${links.onboardingGuidePdf}\nOnboarding guide (text): ${links.onboardingGuideText}\nBadge / sticker: ${links.badge}\nOnboarding video: ${links.video}\nBenefits page: ${links.benefits}\n\nWelcome to the Verified Driver Partner program.`;
}
