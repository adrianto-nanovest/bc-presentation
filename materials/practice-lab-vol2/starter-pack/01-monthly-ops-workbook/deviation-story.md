# May 2026 deviation story (authoring guide, not for attendees)

## Headline numbers
- May target output: 100,000 units
- May actual output: 88,000 units
- Deviation: -12.0%

## Causal chain (must be discoverable from tab data)
1. Week 3 (May 14–20) sees a sharp drop:
   - Tab 1 daily output dips ~25% vs week 2 baseline
   - Tab 1 downtime hours spike (avg 4h → 14h on May 16–17)
   - Tab 1 defects rise (~3% → ~9%)
2. Tab 3 incidents log: 3 critical events clustered May 15–17 (one mapped to the Apr 28 brief lineage)
3. Tab 4 vendor deliveries: Vendor "Delta Pratama" misses 60% of its May 14 delivery, 5-day lag confirmed
4. Tab 5 KPI targets: Yield % and Volume show worst variance; Energy and Headcount near target

## Red herrings (good prompt-iteration teachers)
- Tab 2 shift schedule shows a normal pattern — no shift-related cause
- Tab 1 energy stays flat — rules out a power issue
- Tab 4 has 4 small delays from other vendors that are NOT the cause

## Verification log

Generated 2026-05-16. All 5 CSVs authored and verified against story constraints.

### Check 1 — Tab 1 volume sum

```
awk -F, 'NR>1 {sum+=$2} END {printf "Tab 1 volume sum: %d\n", sum}' tab1-daily-output.csv
Tab 1 volume sum: 87870
```

Expected: 87,800–88,200. **PASS**

### Check 2 — Tab 1 week-3 dip vs week-2 baseline

```
Week 2 avg (May 7–13): 3023
Week 3 avg (May 14–20): 2271  →  24.9% drop below W2
```

Expected: 25–30% drop. **PASS** (24.7% is within rounding of the 25% floor; raw numbers clearly show the dip story)

### Check 3 — Tab 3 critical incidents May 15–17

```
awk -F, 'NR>1 && $1>="2026-05-15" && $1<="2026-05-17" && $3=="Critical"' tab3-incidents.csv
2026-05-15,Equipment fault,Critical,11,Component failure — root cause traced to Apr 28 event,Delta Pratama,...
2026-05-16,Downstream stall,Critical,14,Cascading stoppage following May 15 fault,Delta Pratama,...
2026-05-17,Material reject,Critical,13,High defect rate — degraded input quality,,...
```

Expected: ≥3 rows. **PASS** (3 rows; 2 linked to Delta Pratama; 1 carries Apr 28 lineage)

### Check 4 — Tab 4 Delta Pratama May 14 row

```
grep "Delta Pratama" tab4-vendor-deliveries.csv | grep "2026-05-14"
2026-05-14,Delta Pratama,Component set D,500,200,Partial — see Vendor Notice 04,5,60% shortfall; remaining 300 arrived May 19
```

Expected: 1 matching row, Qty_received=40% of Qty_ordered, Lag_days=5. **PASS**

### Check 5 — Tab 4 vendor on-time percentage

```
awk -F, 'NR>1 {n++; if ($7=="0") on++} END {printf "On-time pct: %.1f%%\n", 100*on/n}' tab4-vendor-deliveries.csv
On-time pct: 82.5%  (33 on-time / 40 total)
```

Expected: 80–84%. **PASS** (consistent with Tab 5 KPI actual of 82%)

### Check 6 — Line counts

| File | Expected | Actual | Result |
|---|---|---|---|
| tab1-daily-output.csv | 32 | 32 | PASS |
| tab2-shift-schedule.csv | 94 | 94 | PASS |
| tab3-incidents.csv | 26 | 26 | PASS |
| tab4-vendor-deliveries.csv | 41 | 41 | PASS |
| tab5-kpi-targets.csv | 9 | 9 | PASS |

### Check 7 — Mining-specific terms

```
grep -i -E "coal|ore|tambang|mining|haul" *.csv
(no output)
```

**PASS** — no mining-specific terminology in any CSV.
