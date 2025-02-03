import { alertSlice } from "../reducers/alert";
import { AppDispatch } from "../store";

export type ApiResponse<T> = {
  isSuccess: boolean;
  status: number | null;
  statusText: string | null;
  data: T | null;
};

const GenericErrorMessage =
  "Ops, algo deu errado. Estamos verificando o que pode ter acontecido, sentimos muito.";

export async function apiGet<T>(
  dispatch: AppDispatch,
  url: string,
  successMessage: string | null = null,
  showErrorAlert: boolean = true
) {
  const requestInit: RequestInit = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetchApi<T>(
    dispatch,
    url,
    requestInit,
    successMessage,
    null,
    showErrorAlert
  );
}

export async function apiDelete<T>(
  dispatch: AppDispatch,
  url: string,
  successMessage: string | null = null,
  isBodyNotJson: boolean | null = false,
  showErrorAlert: boolean = true
) {
  const requestInit: RequestInit = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  return fetchApi<T>(
    dispatch,
    url,
    requestInit,
    successMessage,
    isBodyNotJson,
    showErrorAlert
  );
}

export async function apiPost<TIn, TOut>(
  dispatch: AppDispatch,
  url: string,
  payloadData: TIn,
  successMessage: string | null = null,
  isBodyNotJson: boolean | null = false,
  showErrorAlert: boolean = true
) {
  const isFormData = payloadData instanceof FormData;

  const requestInit: RequestInit = {
    method: "POST",
    headers: isFormData
      ? {}
      : {
          "Content-Type": "application/json",
        },
    body: isFormData ? (payloadData as FormData) : JSON.stringify(payloadData),
  };
  return fetchApi<TOut>(
    dispatch,
    url,
    requestInit,
    successMessage,
    isBodyNotJson,
    showErrorAlert
  );
}

export async function apiPut<TIn, TOut>(
  dispatch: AppDispatch,
  url: string,
  payloadData: TIn,
  successMessage: string | null = null,
  isBodyNotJson: boolean | null = false,
  showErrorAlert: boolean = true
) {
  const requestInit: RequestInit = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payloadData),
  };
  return fetchApi<TOut>(
    dispatch,
    url,
    requestInit,
    successMessage,
    isBodyNotJson,
    showErrorAlert
  );
}

export async function fetchApi<T>(
  dispatch: AppDispatch,
  url: string,
  init: RequestInit | null = null,
  successMessage: string | null = null,
  isBodyNotJson: boolean | null = false,
  showErrorAlert: boolean | null = true
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`/api/${url}`, init ?? undefined);

    if (!response.ok) {
      const errorMessage = await response.text();
      if (showErrorAlert) {
        dispatch(alertSlice.actions.setError(GenericErrorMessage));
      }
      return {
        isSuccess: false,
        status: null,
        statusText: errorMessage,
        data: null,
      };
    }

    const body = isBodyNotJson
      ? ((await response.text()) as T)
      : ((await response.json()) as T);

    if (successMessage) {
      dispatch(alertSlice.actions.setSuccess(successMessage));
    }

    return {
      isSuccess: true,
      status: response.status,
      statusText: response.statusText,
      data: body,
    };
  } catch (e) {
    dispatch(alertSlice.actions.setError(GenericErrorMessage));
    return {
      isSuccess: false,
      status: null,
      statusText: "Erro Genérico",
      data: null,
    };
  }
}
