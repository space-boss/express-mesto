export function showLoading(button, loadingState) {
  if (loadingState && button != null) {
    button.value = "Сохранение...";
  }
  else {
    button.value = "Сохранить";
  }
}

