(function() {
  // Pastikan DOM siap
  function init() {
    const toggle = document.getElementById('wlmMenuToggle');
    const panel = document.getElementById('wlmMenuPanel');
    if (!toggle || !panel) return;

    // Toggle panel
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      if (panel.style.display === 'block') {
        panel.style.display = 'none';
      } else {
        panel.style.display = 'block';
      }
    });

    // Tutup panel jika klik di luar
    document.addEventListener('click', function(event) {
      if (!toggle.contains(event.target) && !panel.contains(event.target)) {
        panel.style.display = 'none';
      }
    });

    // Collapse/expand kategori
    const headers = panel.querySelectorAll('.card-header');
    headers.forEach(function(header) {
      header.addEventListener('click', function() {
        const content = header.nextElementSibling;
        if (content) {
          content.classList.toggle('open');
        }
      });
    });

    // Fallback fungsi download yang mungkin dipanggil dari tombol di menu
    if (typeof downloadPlayer === 'undefined') {
      window.downloadPlayer = function() {
        alert('Fungsi downloadPlayer belum terdefinisi di halaman ini.');
      };
    }
    if (typeof downloadFile === 'undefined') {
      window.downloadFile = function(url, filename, message) {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        if (message) alert(message);
      };
    }

    // Buka kategori pertama sebagai default
    const firstCard = panel.querySelector('.hub-card .card-content');
    if (firstCard) firstCard.classList.add('open');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();