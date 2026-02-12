import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        {/* Navigation - Back Button (Matches site's minimalist icons) */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-body"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Left Column: Heading (Matches "Contact Us" layout) */}
          <div className="lg:w-1/3">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Legal Framework
            </p>
            <h1 className="font-serif text-5xl lg:text-6xl mb-8 text-foreground leading-tight">
              Terms & Conditions
            </h1>
            <div className="space-y-6 text-sm text-muted-foreground font-body leading-relaxed">
              <p>
                Effective Date: February 2026. <br />
                These terms govern your usage of the NOVAN e-commerce platform.
              </p>
              <div className="pt-4 border-t border-border w-fit">
                <p className="text-foreground font-medium uppercase tracking-wider text-xs mb-2">
                  Legal Support
                </p>
                <p>legal@novan.com</p>
              </div>
            </div>
          </div>

          {/* Vertical Divider (Matches Contact Page) */}
          <div className="hidden lg:block w-[1px] bg-border min-h-[600px]"></div>

          {/* Right Column: Refined Policy Content */}
          <div className="lg:w-2/3 space-y-16 pb-20">
            <section>
              <h2 className="font-body text-xs tracking-[0.2em] uppercase text-foreground mb-6">
                01. Acceptance of Terms
              </h2>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                By accessing the NOVAN store, you agree to be bound by these
                Terms of Service. Our platform provides a curated selection of
                premium men's and women's apparel. You represent that you are of
                legal age and that your use of our products is strictly for
                lawful purposes. Any violation of these terms will result in
                immediate termination of Service.
              </p>
            </section>

            <section>
              <h2 className="font-body text-xs tracking-[0.2em] uppercase text-foreground mb-6">
                02. Product & Visual Accuracy
              </h2>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                We strive for absolute precision in our product displays.
                However, given the nature of textile photography, fabric colors
                may vary slightly depending on your digital display. All shirts
                and t-shirts are subject to limited availability. We reserve the
                right to limit purchase quantities or discontinue items at our
                sole discretion.
              </p>
            </section>

            <section>
              <h2 className="font-body text-xs tracking-[0.2em] uppercase text-foreground mb-6">
                03. Pricing & Order Refusal
              </h2>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                Prices for our collections are subject to revision without prior
                notice. NOVAN reserves the right to refuse any order for reasons
                including suspected fraudulent activity or pricing errors. If an
                order is cancelled, we will notify you using the email address
                provided during checkout.
              </p>
            </section>

            <section>
              <h2 className="font-body text-xs tracking-[0.2em] uppercase text-foreground mb-6">
                04. Intellectual Property
              </h2>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                The NOVAN brand identity—including our logos, text, and
                high-fidelity imagery—is our exclusive intellectual property.
                You are strictly prohibited from reproducing or exploiting any
                portion of our website without express written authorization.
              </p>
            </section>

            <section className="pt-12 border-t border-border">
              <p className="font-serif italic text-muted-foreground">
                Thank you for choosing NOVAN. We appreciate your commitment to
                modern luxury.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
