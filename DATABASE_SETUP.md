# Phase 2: Database Setup for Interactivity

Since you are a no-code user and this site will be hosted statically on GitHub Pages, we will use Google Sheets as your backend database for RSVPs, Comments, and Barbecue Contributions.

Here are the setup instructions when we move to Phase 2:

## Step 1: Create a Google Sheet
1. Create a new Google Sheet on your Google Account.
2. Name the sheet something like `KnightsOfTheFire_Database`.
3. Create three tabs at the bottom:
   - `RSVPs` (Columns: Date, Name, Timestamp)
   - `Comments` (Columns: Page, Name, Content, Timestamp)
   - `Barbecue` (Columns: ExpectedBudget, CurrentCollected)

## Step 2: Add the Google Apps Script
1. In your Google Sheet, click on `Extensions` > `Apps Script`.
2. Delete the empty `myFunction` and paste a script I will provide you when we start Phase 2.
3. Click `Deploy` > `New Deployment`.
4. Choose `Web app`.
5. Under "Execute as", select **Me**.
6. Under "Who has access", select **Anyone**.
7. Deploy and copy the `Web App URL`.

## Step 3: Link the Website
1. You will provide the `Web App URL` to me or your coding agent.
2. We will update the `submitComment()`, `submitRsvp()`, and the pool fetching functions inside the HTML files to point to your new URL.

That's it! Every time someone comments or RSVPs, a new row will pop up in your Google Sheet, and the website will automatically read your Barbecue collected amount!
