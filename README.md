## Resend Waitlist
### Allow users to add themselves to your waitlist with this convenient React component

This package uses the [Resend API](https://resend.com/docs)

#### Instructions
1. Create or Login to your [Resend account](https://www.resend.com)

2. Add unique values to your config files
    - Create new or use existing [Resend API key](https://resend.com/api-keys) and save as `REACT_APP_RESEND_API_KEY`
    - Get the desired audience id from your [audiences tab](https://resend.com/audiences). Whichever audience group you want new users to be able to add themselves to. Save this under `REACT_APP_RESEND_AUDIENCE_ID`

Your `.env.local` should look something like this:
```
REACT_APP_RESEND_API_KEY={your-api-key}
REACT_APP_RESEND_AUDIENCE_ID={your-audience-id}
```

3. Install the package 
```
npm install @lwonsower/resend-waitlist@1.1.5
```

4. Now you can use the waitlist in your react app
```
import { Waitlist } from '@lwonsower/resend-waitlist';

export default function App() {
  return (
    <div>
      <Waitlist />
    </div>
  );
}
```
