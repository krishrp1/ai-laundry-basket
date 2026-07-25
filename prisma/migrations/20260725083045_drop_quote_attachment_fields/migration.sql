-- Drop unused quote-attachment columns: no upload path has ever written to
-- them (admin UI only ever read them), so they're dead schema, not a feature
-- being removed.
ALTER TABLE "QuoteRequest" DROP COLUMN "attachmentUrl";
ALTER TABLE "QuoteRequest" DROP COLUMN "attachmentName";
