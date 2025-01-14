// Modalı və əlaqəli elementləri seçirik
const modal = document.querySelector(".modal"); // Modal konteyneri
const modalBtn = document.querySelector(".modal_btn"); // Submit düyməsi
const formInput = document.querySelector(".form_input input"); // Input elementi

// Modalı açmaq üçün düymə əlavə etməyi nəzərdə tutaraq
const openModalBtn = document.querySelector("#openModal"); // Aç düyməsi (əgər mövcuddursa)

// Modal açılma funksiyası
if (openModalBtn) {
  openModalBtn.addEventListener("click", () => {
    modal.classList.add("active"); // Modalı göstərmək üçün "active" sinfi əlavə olunur
  });
}

// Modalı bağlama funksiyası (modalın xaricinə klik edildikdə)
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("active"); // "active" sinfi çıxarılır və modal bağlanır
  }
});

// Formun submit funksiyasını idarə etmək
modalBtn.addEventListener("click", (event) => {
  event.preventDefault(); // Formun göndərilməsini dayandırırıq
  const inputValue = formInput.value.trim(); // Input dəyərini götürürük

  if (inputValue) {
    alert(`Daxil edilən kateqoriya adı: ${inputValue}`);
    formInput.value = ""; // Input-u təmizləyirik
    modal.classList.remove("active"); // Modalı bağlayırıq
  } else {
    alert("Zəhmət olmasa kateqoriya adını daxil edin!");
  }
});
