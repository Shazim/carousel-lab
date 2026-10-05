# Research — 5,000 AI-built apps leaking data (T8)

Shazim's brief, preserved for re-verification.

Built on: the Lovable flaw (April) and the RedAccess scan (May).
- Lovable's broken object-level authorization (BOLA) flaw, reported 20 Apr 2026,
  affected every project created before Nov 2025. One university app exposed
  18,697 student records, including 4,538 minors.
- RedAccess (May 2026) scanned about 380,000 vibe-coded apps and found about
  5,000 leaking sensitive data.

Sources:
- https://www.axios.com/2026/05/07/loveable-replit-vibe-coding-privacy
- https://bastion.tech/blog/lovable-april-2026-data-breach/

Editorial notes:
- Check 1 (change the ID) is the test for exactly the BOLA flaw class above.
- Check 2 nuance added by Claude: Supabase anon/publishable keys are designed to
  ship to the browser; only secret and service-role keys must never appear.
- University-records detail (18,697 / 4,538 minors) deliberately left off the
  slides — available for a follow-up post or the caption if more weight is needed.
