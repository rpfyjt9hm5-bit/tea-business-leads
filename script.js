const form = document.querySelector("#lead-form");
const feedback = document.querySelector("#form-feedback");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");
const year = document.querySelector("#current-year");

year.textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "打开导航菜单" : "关闭导航菜单");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "打开导航菜单");
    navigation.classList.remove("is-open");
  }
});

form.addEventListener("input", (event) => {
  event.target.removeAttribute("aria-invalid");
  feedback.textContent = "";
});

form.addEventListener("change", (event) => {
  event.target.removeAttribute("aria-invalid");
  feedback.textContent = "";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const invalidField = [...form.elements].find((field) => field.willValidate && !field.checkValidity());

  if (invalidField) {
    invalidField.setAttribute("aria-invalid", "true");
    feedback.textContent = invalidField.type === "checkbox"
      ? "请先确认信息使用说明，再提交本次咨询。"
      : invalidField.validity.patternMismatch
        ? "请填写有效的 11 位中国大陆手机号。"
        : "请检查并完成标记为必填的信息。";
    invalidField.focus();
    return;
  }

  feedback.textContent = "表单演示验证通过。当前网站未接入后端，您的信息没有发送或保存。";
  form.reset();
});

form.querySelector('[type="submit"]').disabled = false;
