import CookieConsent from "react-cookie-consent";


export const CookieComponent = () =>{
    // const { t } = useTranslation();
    return(<
        
        CookieConsent 
        expires={365}
        // debug={true}
        style={{textAlign:"left"}}
        buttonText="OK"
        >
    
          <span>This app uses cookies to make your experience while using it more comfortable. This applies to features including (but not limited to) setting a theme color or language preferences. By continuing to use this app, you are consenting to our use of cookies. Learn more about the </span> 
          <a target="_blank" href="https://www.freeprivacypolicy.com/live/1fa49d34-d4c5-4a16-8198-5018fff05d3b">Cookie</a>
          <span> and </span> 
          <a target="_blank" href="https://www.freeprivacypolicy.com/live/ff5ed076-848c-4497-9332-a7f2f0c2c251">Privacy </a>
          <span>policies and our </span>
          <a target="_blank" href="https://www.freeprivacypolicy.com/live/a77d5807-a2af-4cf8-a26c-25f0b915bc1e">Terms and Conditions</a>

          </CookieConsent>)
}
