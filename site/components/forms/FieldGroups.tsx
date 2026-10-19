'use client';

import {
  methodLabels,
  sampleSizeLabels,
  substrateLabels,
  timelineLabels,
  volumeLabels,
} from '@/lib/forms/schemas';
import { Field, Fieldset, Select, TextArea } from './fields';
import { useInquiryForm } from './InquiryForm';

const opts = (labels: Record<string, string>) =>
  Object.entries(labels).map(([value, label]) => ({ value, label }));

export function QuoteFields({ productOptions }: { productOptions: { value: string; label: string }[] }) {
  const { errors, productId } = useInquiryForm();
  return (
    <>
      <Fieldset legend="The job" description="What are you coating, and how?">
        {productOptions.length > 0 ? (
          <Select
            name="productInterest"
            label="Product of interest"
            options={productOptions}
            defaultValue={productId}
            error={errors.productInterest}
            hint="Leave blank if you want a recommendation."
          />
        ) : (
          <Field
            name="productInterest"
            label="Product of interest"
            defaultValue={productId}
            error={errors.productInterest}
            hint="Leave blank if you want a recommendation."
          />
        )}
        <TextArea
          name="application"
          label="Part or application"
          required
          rows={4}
          hint="What the part is, where it goes into service, and any spec it must meet."
          error={errors.application}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Select
            name="substrate"
            label="Substrate"
            options={opts(substrateLabels)}
            error={errors.substrate}
          />
          <Field name="substrateOther" label="If other, describe" error={errors.substrateOther} />
          <Select
            name="method"
            label="Application method"
            options={opts(methodLabels)}
            error={errors.method}
          />
          <Select
            name="volume"
            label="Estimated annual volume"
            options={opts(volumeLabels)}
            error={errors.volume}
          />
          <Select
            name="timeline"
            label="When do you need it?"
            options={opts(timelineLabels)}
            error={errors.timeline}
          />
          <Field name="location" label="Project location (city, state)" error={errors.location} />
        </div>
        <TextArea name="message" label="Anything else" rows={3} error={errors.message} />
      </Fieldset>
    </>
  );
}

export function SampleFields({ productOptions }: { productOptions: { value: string; label: string }[] }) {
  const { errors, productId } = useInquiryForm();
  return (
    <Fieldset legend="The sample" description="Which product, and what will you coat with it?">
      {productOptions.length > 0 ? (
        <Select
          name="productInterest"
          label="Product"
          required
          options={productOptions}
          defaultValue={productId}
          error={errors.productInterest}
        />
      ) : (
        <Field
          name="productInterest"
          label="Product"
          required
          defaultValue={productId}
          error={errors.productInterest}
        />
      )}
      <TextArea
        name="application"
        label="Intended use"
        required
        rows={4}
        hint="The part and substrate you will coat, how you apply, and what you will test for."
        error={errors.application}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          name="sampleSize"
          label="Sample size"
          options={opts(sampleSizeLabels)}
          error={errors.sampleSize}
        />
        <Field
          name="currentCoating"
          label="Coating you use today (optional)"
          hint="Supplier and product, so we can send the closest match."
          error={errors.currentCoating}
        />
      </div>
      <TextArea name="message" label="Anything else" rows={3} error={errors.message} />
    </Fieldset>
  );
}

export function TechnicalFields({ productOptions }: { productOptions: { value: string; label: string }[] }) {
  const { errors, productId } = useInquiryForm();
  return (
    <Fieldset legend="Your question">
      {productOptions.length > 0 ? (
        <Select
          name="productInterest"
          label="Product"
          options={productOptions}
          defaultValue={productId}
          error={errors.productInterest}
        />
      ) : (
        <Field
          name="productInterest"
          label="Product"
          defaultValue={productId}
          error={errors.productInterest}
        />
      )}
      <TextArea
        name="question"
        label="Question"
        required
        rows={6}
        hint="Include the substrate, surface preparation, application method and the conditions the part will see."
        error={errors.question}
      />
    </Fieldset>
  );
}

export function ContactFields() {
  const { errors } = useInquiryForm();
  return (
    <Fieldset legend="Your message">
      <Field name="subject" label="Subject" required error={errors.subject} />
      <TextArea name="message" label="Message" required rows={6} error={errors.message} />
    </Fieldset>
  );
}
