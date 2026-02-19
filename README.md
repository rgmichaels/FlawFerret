# FlawFerret

## Usage
1. Build the extension: `npm install` then `npm run build`.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked**.
5. Select the `dist/` folder at `/Users/robertmichaels/Documents/code/testbrowserextension/dist`.
6. Navigate to any regular web page and right-click a target element.
7. Right-click any element on the page and choose **FlawFerret**.
8. The overlay opens with captured context; edit text, generate with AI, and create a Jira ticket.

## Jira Integration
1. Open the extension settings: `chrome://extensions` → **Details** → **Extension options**.
2. Enter your Jira base URL, email, and API token.
3. In the overlay, select a project and click **Create Jira Ticket**.

## AI Scenario Generation (Local)
1. Install server dependencies (if not done): `npm install`.
2. Build the extension: `npm run build`.
3. Start the local server: `npm run ai:server`.
4. In extension options, set **AI Server URL** to `http://localhost:8787`.
5. Choose **AI Provider**:
   - Ollama (default) with model `codellama` and URL `http://localhost:11434`.
   - OpenAI (requires `export OPENAI_API_KEY="..."` before starting the server).
6. Use **Generate with AI** in the overlay to create a full Scenario.

## AI Server (Docker)
1. Set your API key in the environment: `export OPENAI_API_KEY="..."`.
2. Optional model override: `export OPENAI_MODEL="gpt-4o-mini"`.
3. Run: `docker compose up --build`.
4. The service will appear as `issue-creator-server` in Docker.
5. In extension options, set **AI Server URL** to `http://localhost:8787`.

## Tab Recording (Preview)
1. In the overlay, click **Record Tab**.
2. The overlay hides and a small **Recording** control appears.
3. Click **Stop** to return to the overlay with a recording preview.
4. When creating the Jira ticket, the recording is attached automatically.
