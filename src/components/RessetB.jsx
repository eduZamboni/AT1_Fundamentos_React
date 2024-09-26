export default function ResetButton() {
  const resetPage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <button onClick={resetPage} >
      Resetar Aplicação
    </button>
  );
};