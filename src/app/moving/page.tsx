import type { Metadata } from 'next';
import ContentLayout from '@/components/layout/ContentLayout';
import { Callout } from '@/components/ui/Callout';
import AffiliateLink from '@/components/ui/AffiliateLink';
import AffiliateDisclosure from '@/components/ui/AffiliateDisclosure';
import { StepList } from '@/components/ui/StepList';

export const metadata: Metadata = {
  title: 'Moving to the U.S. on a TN Visa',
  description: 'Practical relocation guide: SSN, banking, housing, health insurance, and everything Canadians need to know.',
};

export default function MovingPage() {
  return (
    <ContentLayout
      title="Practical Guide to Moving to the U.S."
      description="SSN, driver's license, banking, housing, health insurance, and everything else you need to know."
      breadcrumbs={[{label:'Moving', href:'/moving'}]}
      lastUpdated="April 2026"
    >
      <AffiliateDisclosure />
      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Social Security Number</h2>
        <p className="mb-4">You need an SSN for employment, banking, credit, and taxes. Here is how to get one:</p>
        <StepList
          steps={[
            { title: 'Wait 10 days after entry', description: 'Your I-94 record must be in the DHS system before SSA can verify your status. Applying too early results in delays or denial.' },
            { title: 'Visit your local SSA office', description: 'Find your nearest Social Security Administration office at ssa.gov. Walk-ins accepted but appointments recommended.' },
            { title: 'Bring required documents', description: 'Passport, I-94 printout (from i94.cbp.dhs.gov), TN approval notice or employer letter, and completed Form SS-5.' },
            { title: 'Receive your card in 7-14 days', description: 'Your SSN card arrives by mail. You can use the receipt letter for employment verification in the meantime.' },
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Driver&apos;s License</h2>
        <p className="mb-4">Requirements vary by state, but generally you need:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Proof of identity</strong> — Passport + I-94</li>
          <li><strong>Proof of residency</strong> — Lease, utility bill, or bank statement with U.S. address</li>
          <li><strong>SSN</strong> — Required in most states</li>
          <li><strong>Proof of legal presence</strong> — I-94, TN approval notice</li>
        </ul>
        <p className="mb-4">
          Your Canadian license is valid for 30-90 days depending on state. Some states waive the road test for
          Canadian license holders. Request a <strong>REAL ID</strong> compliant license for domestic flights.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Health Insurance</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Employer-sponsored</strong> — Best option. Most employers cover 60-80% of premiums. Enroll during onboarding.</li>
          <li><strong>ACA Marketplace</strong> — If employer does not offer coverage. Plans range Bronze to Platinum.</li>
          <li><strong>Budget:</strong> $200-800/month depending on plan level, age, and location</li>
        </ul>
      </section>

      <Callout type="warning" title="Health Insurance Alert">
        2025-2026: Premium tax credits (subsidies) are being phased out for lawful immigrants who are not yet
        permanent residents. Budget for full-price marketplace premiums if your employer does not provide coverage.
      </Callout>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Banking &amp; Credit</h2>
        <p className="mb-4">You start with zero U.S. credit history regardless of your Canadian score:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Open a checking account</strong> — Chase, Bank of America, or TD Bank (TD is easiest for Canadians)</li>
          <li><strong>Amex Global Transfer</strong> — Transfer your Canadian Amex history to a U.S. Amex card</li>
          <li><strong>Nova Credit</strong> — Some lenders accept Canadian credit reports via Nova Credit</li>
          <li><strong>Secured credit card</strong> — Deposit $500-1000 as collateral to build U.S. credit</li>
          <li><strong>Become an authorized user</strong> — If you know someone with good U.S. credit</li>
        </ul>
      </section>

      <Callout type="tip" title="Credit Hack">
        American Express Global Transfer lets you transfer your Canadian Amex history to a U.S. Amex card —
        giving you an instant credit card without a U.S. credit check. Apply online and select &quot;new to the U.S.&quot;
      </Callout>

      <Callout type="tip" title="Multi-Currency Banking">
        Before you move, set up a <AffiliateLink href="https://wise.com/invite/" provider="wise">Wise multi-currency account</AffiliateLink> to manage USD and CAD in one place with the real exchange rate.
      </Callout>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Housing</h2>
        <p className="mb-4">Finding housing without U.S. credit history is challenging but solvable:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Larger security deposit</strong> — Offer 2-3 months upfront to offset no credit</li>
          <li><strong>Employer letter</strong> — Have your employer confirm salary and employment</li>
          <li><strong>Corporate housing</strong> — Short-term furnished apartments while you establish credit (1-3 months)</li>
          <li><strong>Individual landlords</strong> — More flexible than large property management companies</li>
          <li><strong>Bank statements</strong> — Show 3-6 months of Canadian savings as proof of stability</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Moving Belongings</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Duty-free entry</strong> — Personal effects owned for 1+ year enter duty-free</li>
          <li><strong>CBP Form 3299</strong> — Declaration of free entry for personal effects. Complete before arrival.</li>
          <li><strong>Vehicle import</strong> — Must meet EPA and DOT standards. Most Canadian vehicles qualify. Need Form HS-7 and EPA Form 3520-1.</li>
          <li><strong>Shipping</strong> — Budget $2,000-8,000 depending on volume and distance</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Pets</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Dogs</strong> — Need rabies vaccination certificate + microchip. No quarantine from Canada.</li>
          <li><strong>Cats</strong> — No federal requirements, but check state and airline rules</li>
          <li><strong>CDC requirements</strong> — Dogs must appear healthy. Rabies certificate must show vaccination at least 28 days prior.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-fg mt-12 mb-4">Phone &amp; Utilities</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Phone</strong> — Get a prepaid U.S. SIM immediately (T-Mobile, Mint Mobile). Postpaid plans require credit check.</li>
          <li><strong>Utilities</strong> — Electric, gas, water, internet may require deposits ($100-300) without credit history</li>
          <li><strong>Internet</strong> — Research providers before signing a lease. Availability varies by address.</li>
        </ul>
      </section>
    </ContentLayout>
  );
}
