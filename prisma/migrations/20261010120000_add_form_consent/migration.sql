-- Record when and under which policy version a visitor gave consent on each
-- public form. Nullable: rows created before this migration have no record.
ALTER TABLE "QuoteRequest"
  ADD COLUMN "consentAt" TIMESTAMP(3),
  ADD COLUMN "consentVersion" TEXT;

ALTER TABLE "ContactMessage"
  ADD COLUMN "consentAt" TIMESTAMP(3),
  ADD COLUMN "consentVersion" TEXT;
