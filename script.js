document.addEventListener("DOMContentLoaded", () => {
    // ➔ NHỚ DÁN LINK API VÀO ĐÂY:
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzgQBCpMeRRVHM6YctQh5g7Vy48UMW48c1aGoKT_lCe0EKNvkmxZlsP0wM8M979YZG_/exec";

    // 1. THÔNG BÁO TỪ GOOGLE DOCS (ANIMATION)
    const annBar = document.getElementById('announcementBar');
    const annText = document.getElementById('announcementText');
    const annContainer = document.getElementById('announcementTextContainer');
    const closeAnnouncementBtn = document.getElementById('closeAnnouncement');

    if (annBar && annText && annContainer && closeAnnouncementBtn) {
        closeAnnouncementBtn.addEventListener('click', () => { annBar.style.display = 'none'; });

        async function fetchAnnouncement() {
            try {
                const res = await fetch(GOOGLE_SCRIPT_URL);
                const data = await res.json();
                
                if (data && data.status === "success") {
                    const text = data.text.trim();
                    if (text.length > 0) {
                        annText.innerText = text;
                        annBar.style.display = 'flex'; 

                        setTimeout(() => {
                            const textWidth = annText.scrollWidth;
                            const containerWidth = annContainer.clientWidth;

                            if (textWidth > containerWidth) {
                                const distance = textWidth - containerWidth + 40; 
                                const duration = distance * 25;

                                function playMarquee() {
                                    if (!annText.animate) return; // Bảo vệ trình duyệt cũ
                                    const animation = annText.animate([
                                        { transform: 'translateX(0)' },
                                        { transform: `translateX(-${distance}px)` }
                                    ], {
                                        duration: duration,
                                        easing: 'linear',
                                        fill: 'forwards'
                                    });

                                    animation.onfinish = () => {
                                        annText.style.transform = 'translateX(0)';
                                        setTimeout(playMarquee, 1000); 
                                    };
                                }
                                setTimeout(playMarquee, 1000); 
                            }
                        }, 500); 
                    }
                }
            } catch (error) { console.error("Lỗi tải thông báo:", error); }
        }
        fetchAnnouncement();
    }

    // 2. CHUYỂN TAB MƯỢT MÀ
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-tab');
            if(!targetId) return;
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            tabContents.forEach(tab => tab.classList.remove('active'));
            const targetTab = document.getElementById(targetId);
            if (targetTab) targetTab.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 3. XỬ LÝ GỬI FORM HỖ TRỢ AN TOÀN
    const form = document.getElementById("supportForm");
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault(); 
            if(GOOGLE_SCRIPT_URL === "DÁN_LINK_APP_SCRIPT_VÀO_ĐÂY") { 
                alert("Đã xảy ra lỗi, vui lòng thử lại sau!"); 
                return; 
            }
            
            const btn = document.getElementById("submitBtn");
            const originalText = btn ? btn.innerText : "Gửi yêu cầu";
            if(btn) { btn.innerText = "Đang gửi đi..."; btn.disabled = true; }

            const formData = new URLSearchParams();
            formData.append("type", document.getElementById("requestType")?.value || "");
            formData.append("playerName", document.getElementById("playerName")?.value || "");
            formData.append("isAnonymous", document.getElementById("isAnonymous")?.checked || false);
            formData.append("hideEvidence", document.getElementById("hideEvidence")?.checked || false);
            formData.append("evidence", document.getElementById("evidenceLink")?.value || "");
            formData.append("content", document.getElementById("playerContent")?.value || "");

            try {
                const res = await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: formData });
                const data = await res.json();
                if (data && data.result === "success") {
                    alert("Ý kiến của bạn đã được ghi nhận, cảm ơn bạn!");
                    form.reset(); 
                } else { 
                    alert("Đã xảy ra lỗi, vui lòng thử lại sau!"); 
                }
            } catch(error) { 
                alert("Đã xảy ra lỗi, vui lòng thử lại sau!"); 
            } finally { 
                if(btn) { btn.innerText = originalText; btn.disabled = false; } 
            }
        });
    }

    // 4. THEME & ANIMATION
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        if (savedTheme === "dark") { document.body.setAttribute("data-theme", "dark"); themeToggle.checked = true; }
        themeToggle.addEventListener("change", function() {
            if (this.checked) { document.body.setAttribute("data-theme", "dark"); localStorage.setItem("theme", "dark"); } 
            else { document.body.removeAttribute("data-theme"); localStorage.setItem("theme", "light"); }
        });
    }

    const animToggle = document.getElementById('animToggle');
    if (animToggle) {
        if(localStorage.getItem("noAnim") === "true") { document.body.classList.add("no-anim"); animToggle.checked = false; }
        animToggle.addEventListener("change", function() {
            if (this.checked) { document.body.classList.remove("no-anim"); localStorage.setItem("noAnim", "false"); } 
            else { document.body.classList.add("no-anim"); localStorage.setItem("noAnim", "true"); }
        });
    }

    // 5. ZOOM ẢNH TỐI ƯU
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    document.querySelectorAll(".zoomable").forEach(img => {
        img.addEventListener("click", function() {
            if (modal && modalImg) {
                modal.style.display = "block"; setTimeout(() => modal.classList.add("show"), 10); 
                modalImg.src = this.src; document.body.style.overflow = "hidden";
            }
        });
    });
    const closeModal = () => {
        if (modal) { modal.classList.remove("show"); setTimeout(() => { modal.style.display = "none"; document.body.style.overflow = "auto"; }, 250); }
    };
    const closeModalBtn = document.getElementById("closeModalBtn");
    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
    if (modal) modal.addEventListener("click", e => { if (e.target !== modalImg) closeModal(); });

    // 6. TÌM KIẾM
    const searchInput = document.getElementById("commandSearch");
    if (searchInput) {
        searchInput.addEventListener("input", function() {
            let filter = this.value.toLowerCase().trim();
            document.querySelectorAll(".cmd-item").forEach(item => {
                let text = (item.textContent || item.innerText).toLowerCase();
                item.style.display = text.includes(filter) ? "" : "none";
            });
        });
    }

    // 7. NGÔN NGỮ
    const langSelect = document.getElementById("langSelect");
    if (langSelect) {
        langSelect.value = window.location.href.includes('en.html') ? "en" : "vi";
        langSelect.addEventListener("change", function() {
            if (this.value === "en") window.location.href = "en.html";
            else window.location.href = "index.html";
        });
    }
});
