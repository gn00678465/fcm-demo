export interface Message {
  message: {
    token?: string | string[];
    topic?: string;
    notification?: {
      title?: string;
      body?: string;
    };
    data?: Record<string, unknown>;
    android?: {
      notification?: {
        click_action?: string;
        body?: string;
      };
    };
    apns?: {
      payload?: {
        aps?: {
          category?: string;
        };
      };
    };
  };
}
