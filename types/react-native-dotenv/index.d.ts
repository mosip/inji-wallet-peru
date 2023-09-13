declare module 'react-native-dotenv' {
  /**
   * URL for the Mimoto backend server
   */
  export const MIMOTO_HOST: string;

  /**
   * URL for the Esignet backend server
   */
  export const ESIGNET_HOST: string;

  /**
   * API key to use Google Nearby Messages API
   */
  export const GOOGLE_NEARBY_MESSAGES_API_KEY: string;

  /**
   * Flag for Toggling Purple Theme and Default Theme
   */
  export const APPLICATION_THEME: string;

  /**
   * Flag for Toggling environment url
   */
  export const CREDENTIAL_REGISTRY_EDIT: string;

  /**
   * LANGUAGE for the unsupported device languages
   */
  export const APPLICATION_LANGUAGE: string;
}
