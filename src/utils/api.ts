/* eslint-disable @typescript-eslint/no-explicit-any */
// Error handling and API integration utilities

// Common API response interface
export interface ApiResponse<T = any> {
  data?: T;
  error?: ApiError;
  status: number;
  success: boolean;
}

// API error interface
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// API endpoints configuration
export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
  },

  // Citizen endpoints
  CITIZEN: {
    PROFILE: "/citizen/profile",
    APPLICATIONS: "/citizen/applications",
    DOCUMENTS: "/citizen/documents",
    APPOINTMENTS: "/citizen/appointments",
    MESSAGES: "/citizen/messages",
  },

  // Services endpoints
  SERVICES: {
    PASSPORT: "/services/passport",
    ATTESTATION: "/services/attestation",
    NO_OBJECTION_LETTER: "/services/nol",
    EMERGENCY_TRAVEL_CERTIFICATE: "/services/etc",
  },

  // Admin endpoints
  ADMIN: {
    USERS: "/admin/users",
    APPLICATIONS: "/admin/applications",
    REPORTS: "/admin/reports",
    SETTINGS: "/admin/settings",
  },
};

// Error codes
export const ERROR_CODES = {
  // Authentication errors
  AUTH_FAILED: "auth/failed",
  INVALID_CREDENTIALS: "auth/invalid-credentials",
  USER_NOT_FOUND: "auth/user-not-found",
  EMAIL_ALREADY_EXISTS: "auth/email-already-exists",

  // Validation errors
  VALIDATION_ERROR: "validation/error",
  INVALID_DATA: "validation/invalid-data",
  MISSING_REQUIRED_FIELD: "validation/missing-required-field",

  // Server errors
  SERVER_ERROR: "server/error",
  SERVICE_UNAVAILABLE: "server/service-unavailable",

  // Resource errors
  RESOURCE_NOT_FOUND: "resource/not-found",
  PERMISSION_DENIED: "resource/permission-denied",
  QUOTA_EXCEEDED: "resource/quota-exceeded",

  // Application specific errors
  APPLICATION_ALREADY_SUBMITTED: "application/already-submitted",
  APPLICATION_NOT_FOUND: "application/not-found",
  APPLICATION_STATUS_INVALID: "application/status-invalid",

  // Payment errors
  PAYMENT_FAILED: "payment/failed",
  PAYMENT_DECLINED: "payment/declined",
  PAYMENT_INVALID: "payment/invalid",
};

// Error messages mapping
export const ERROR_MESSAGES = {
  [ERROR_CODES.AUTH_FAILED]: "Authentication failed. Please try again.",
  [ERROR_CODES.INVALID_CREDENTIALS]: "Invalid email or password.",
  [ERROR_CODES.USER_NOT_FOUND]: "User not found.",
  [ERROR_CODES.EMAIL_ALREADY_EXISTS]: "Email address is already registered.",

  [ERROR_CODES.VALIDATION_ERROR]: "Please check your input and try again.",
  [ERROR_CODES.INVALID_DATA]: "The provided data is invalid.",
  [ERROR_CODES.MISSING_REQUIRED_FIELD]: "Please fill in all required fields.",

  [ERROR_CODES.SERVER_ERROR]:
    "An unexpected server error occurred. Please try again later.",
  [ERROR_CODES.SERVICE_UNAVAILABLE]:
    "The service is temporarily unavailable. Please try again later.",

  [ERROR_CODES.RESOURCE_NOT_FOUND]: "The requested resource was not found.",
  [ERROR_CODES.PERMISSION_DENIED]:
    "You do not have permission to access this resource.",
  [ERROR_CODES.QUOTA_EXCEEDED]:
    "You have exceeded your quota for this operation.",

  [ERROR_CODES.APPLICATION_ALREADY_SUBMITTED]:
    "An application of this type has already been submitted.",
  [ERROR_CODES.APPLICATION_NOT_FOUND]: "Application not found.",
  [ERROR_CODES.APPLICATION_STATUS_INVALID]:
    "The application cannot be modified in its current status.",

  [ERROR_CODES.PAYMENT_FAILED]: "Payment processing failed. Please try again.",
  [ERROR_CODES.PAYMENT_DECLINED]:
    "Payment was declined. Please check your payment details.",
  [ERROR_CODES.PAYMENT_INVALID]: "Invalid payment information provided.",
};

// Default API configuration
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "https://api.embassycrm.com/v1",
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
};

// API request handler with error handling
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
  customConfig = {}
): Promise<ApiResponse<T>> {
  try {
    const config = { ...API_CONFIG, ...customConfig };
    const url = `${config.BASE_URL}${endpoint}`;

    // Add default headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    // Add authorization token if available
    const citizenToken = localStorage.getItem("citizenToken");
    const adminToken = localStorage.getItem("adminToken");

    if (citizenToken) {
      headers["Authorization"] = `Bearer ${citizenToken}`;
    } else if (adminToken) {
      headers["Authorization"] = `Bearer ${adminToken}`;
    }

    // Prepare the final request options
    const requestOptions: RequestInit = {
      ...options,
      headers,
    };

    // Set timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.TIMEOUT);
    requestOptions.signal = controller.signal;

    // Make the request
    const response = await fetch(url, requestOptions);
    clearTimeout(timeoutId);

    const data = await response.json();

    if (response.ok) {
      return {
        data,
        status: response.status,
        success: true,
      };
    } else {
      return {
        error: {
          code: data.code || ERROR_CODES.SERVER_ERROR,
          message: data.message || ERROR_MESSAGES[ERROR_CODES.SERVER_ERROR],
          details: data.details,
        },
        status: response.status,
        success: false,
      };
    }
  } catch (error: unknown) {
    // Handle fetch errors (network issues, timeout, etc.)
    if (error instanceof Error && error.name === "AbortError") {
      return {
        error: {
          code: ERROR_CODES.SERVICE_UNAVAILABLE,
          message: ERROR_MESSAGES[ERROR_CODES.SERVICE_UNAVAILABLE],
          details: "Request timeout",
        },
        status: 0,
        success: false,
      };
    }

    return {
      error: {
        code: ERROR_CODES.SERVER_ERROR,
        message: ERROR_MESSAGES[ERROR_CODES.SERVER_ERROR],
        details: error instanceof Error ? error.message : String(error),
      },
      status: 0,
      success: false,
    };
  }
}

// Wrapper for GET requests
export function get<T = any>(endpoint: string, customConfig = {}) {
  return apiRequest<T>(
    endpoint,
    {
      method: "GET",
    },
    customConfig
  );
}

// Wrapper for POST requests
export function post<T = any>(endpoint: string, data: any, customConfig = {}) {
  return apiRequest<T>(
    endpoint,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    customConfig
  );
}

// Wrapper for PUT requests
export function put<T = any>(endpoint: string, data: any, customConfig = {}) {
  return apiRequest<T>(
    endpoint,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    customConfig
  );
}

// Wrapper for PATCH requests
export function patch<T = any>(endpoint: string, data: any, customConfig = {}) {
  return apiRequest<T>(
    endpoint,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
    customConfig
  );
}

// Wrapper for DELETE requests
export function del<T = any>(endpoint: string, customConfig = {}) {
  return apiRequest<T>(
    endpoint,
    {
      method: "DELETE",
    },
    customConfig
  );
}

// Helper function to handle form data uploads (multipart/form-data)
export function uploadFormData<T = any>(
  endpoint: string,
  formData: FormData,
  customConfig = {}
) {
  return apiRequest<T>(
    endpoint,
    {
      method: "POST",
      body: formData,
      headers: {
        // Don't set Content-Type header - the browser will set it with the correct boundary
      },
    },
    customConfig
  );
}

// Helper function to standardize error handling across the application
export function handleApiError(error: ApiError): string {
  if (error.code && ERROR_MESSAGES[error.code]) {
    return ERROR_MESSAGES[error.code];
  }

  // Fallback error message
  return ERROR_MESSAGES[ERROR_CODES.SERVER_ERROR];
}

// Handle form validation errors from the API
export function mapApiValidationErrors(
  validationErrors: any
): Record<string, string> {
  if (!validationErrors) return {};

  // Assume validationErrors is an object where keys are field names and values are error messages
  return validationErrors;
}

// Global error logger
export function logError(error: any, context: string = "general"): void {
  // In a real app, you might send this to a logging service
  console.error(`[${context}] Error:`, error);

  // Example of how you might integrate with a logging service
  // logger.error({ error, context });
}
