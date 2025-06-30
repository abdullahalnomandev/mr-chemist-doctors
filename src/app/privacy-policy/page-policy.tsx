"use client";

import Link from "next/link";

export default function PolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-secondary px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-medium">Privacy & Policy</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-2 py-8">
        <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>

        <p className="mb-6">
          Mr Chemist values your privacy and is committed to protecting your personal information. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read
          this policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the
          site.
        </p>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Information We Collect</h2>

          <p className="mb-3">We may collect personally identifiable information, such as:</p>
          <ul className="mb-4 list-disc space-y-1 pl-6">
            <li>Name</li>
            <li>Contact information (email address, phone number, mailing address)</li>
            <li>Payment details (if making purchases)</li>
            <li>Health-related information required for prescriptions or consultations</li>
          </ul>

          <h3 className="mb-2 text-xl font-medium">Non-Personal Information</h3>
          <p className="mb-3">We may collect non-personal information, such as:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Browser type</li>
            <li>Operating system</li>
            <li>IP address</li>
            <li>Pages viewed, links clicked, and other usage data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">How We Use Your Information</h2>
          <p className="mb-3">We may use the information we collect for purposes such as:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Processing prescription orders and payments</li>
            <li>Providing personalized customer support</li>
            <li>Communicating with you about your orders, consultations, or promotions</li>
            <li>Improving our website functionality and user experience</li>
            <li>Ensuring compliance with legal and regulatory requirements</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">How We Share Your Information</h2>
          <p className="mb-4">
            We do not sell or rent your personal information. However, we may share your information in the following
            ways:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Service Providers:</strong> We may share information with third-party vendors who help us operate
              our website or provide services to you (e.g., payment processors, delivery services).
            </li>
            <li>
              <strong>Legal Compliance:</strong> We may disclose information to comply with legal obligations, respond
              to lawful requests, or protect our rights.
            </li>
            <li>
              <strong>Health Professionals:</strong> Your health-related information may be shared with licensed
              pharmacists or healthcare providers to fulfill prescriptions or provide medical consultations.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Cookies and Tracking Technologies</h2>
          <p className="mb-4">
            We do not sell, trade, or rent Users' personal identification information to others. We may share generic
            aggregated demographic information not linked to any personal identification information regarding visitors
            and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Enhance website functionality</li>
            <li>Analyze website traffic</li>
            <li>Personalize your user experience</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your information from unauthorized
            access, alteration, disclosure, or destruction. Despite our efforts, no security measures are foolproof, and
            we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Your Rights</h2>
          <p className="mb-3">Depending on your location, you may have the following rights:</p>
          <ul className="mb-4 list-disc space-y-1 pl-6">
            <li>Access to your personal data</li>
            <li>Deletion of your personal data (subject to legal or regulatory obligations)</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
            <li>Withdrawal of consent</li>
          </ul>
          <p>
            To exercise these rights, please contact us at{" "}
            <a href="mailto:privacy@mrchemist.com" className="text-blue-600 hover:underline">
              privacy@mrchemist.com
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Third-Party Websites</h2>
          <p className="mb-4">
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or
            content of such websites. Please review the privacy policies of any third-party sites you visit.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Children's Privacy</h2>
          <p className="mb-4">
            Our website is not intended for children under the age of 13. We do not knowingly collect information from
            children. If we become aware that we have collected personal information from a child under 13, we will
            delete it immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Changes to This Privacy Policy</h2>
          <p className="mb-4">
            Our Site may use "cookies" to enhance User experience. Users' web browsers place cookies on their hard drive
            for record-keeping purposes and sometimes to track information about them. Mr Chemist has the discretion to
            update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this
            page. We encourage Users to frequently check this page for any changes to stay informed about how we are
            helping to protect the personal information we collect. You acknowledge and agree that it is your
            responsibility to review this privacy policy periodically and become aware of modifications. Users may
            choose to set their web browser to refuse cookies or to alert you when cookies are being sent. If they do
            so, note that some parts of the Site may not function properly.
          </p>
          <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </section>
      </div>
    </div>
  );
}
