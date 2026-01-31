# Testing AI Magic Features

## How to Test:

1. **Open the app**: Navigate to `http://localhost:5173` in your browser
2. **Generate a new trip**: 
   - Click "Start Planning"
   - Fill in destination (e.g., "Tokyo, Japan")
   - Select dates
   - Choose preferences
   - Click "Generate Plan"

3. **View the Trip Plan**: You should see your itinerary

4. **Test AI Magic Card** (in the sidebar):
   - Look for the orange/gold "AI Magic" card
   - Click "Wake up late?" - Should show a notification with rescheduling advice
   - Click "Skipped place?" - Should show alternative activity suggestions
   - Click "Overspent?" - Should show budget-friendly alternatives

5. **Test Crowd Density** (in each activity card):
   - Each morning/afternoon/evening slot should show:
     - A "Crowd Density" bar (green/yellow/red based on percentage)
     - "Best time to visit" with a specific time
     - These appear below the "Must Do" / "Safe to Skip" tags

## What to Check in Browser Console:

Open DevTools (F12) and look for:
- `🧠 AI Magic triggered:` messages when clicking buttons
- Any error messages in red
- The plan data structure being logged

## Expected Behavior:

✅ **AI Magic Notification appears** at the bottom center of screen
✅ **Notification shows** for 8 seconds then disappears
✅ **Crowd bars** are color-coded (green < 40%, yellow 40-70%, red > 70%)
✅ **Best time** displays like "Best time to visit: 7:00 AM"

## Troubleshooting:

If AI Magic doesn't work:
1. Check browser console for errors
2. Verify the plan has `smartAlternatives` data (console will log this)
3. Try generating a NEW plan (old plans won't have the new data)

If Crowd Density doesn't show:
1. Generate a NEW trip plan
2. Old plans created before this feature won't have `crowdDensity` or `bestTime` fields
