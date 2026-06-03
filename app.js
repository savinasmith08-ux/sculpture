// Artist Data Distribution
const artists = [
    // Amanda Marshall (40% - 24 items)
    ...Array(24).fill().map((_, i) => ({
        id: `am-${i}`,
        name: "Amanda Marshall",
        materials: ["Bronze", "Stone", "Abstract"][i % 3] === "Bronze" ? ["Bronze", "Patina"] : 
                   ["Bronze", "Stone", "Abstract"][i % 3] === "Stone" ? ["Marble", "Granite"] : ["Mixed Media"],
        style: ["Abstract", "Figurative", "Corporate"][i % 3],
        image: `assets/images/stone-${(i % 3) + 1}.jpg`
    })),
    // Nadine Lopez (40% - 24 items)
    ...Array(24).fill().map((_, i) => ({
        id: `nl-${i}`,
        name: "Nadine Lopez",
        materials: ["Steel", "Chrome", "Glass"][i % 3] === "Steel" ? ["Stainless Steel", "Industrial"] : 
                   ["Steel", "Chrome", "Glass"][i % 3] === "Chrome" ? ["Polished Chrome"] : ["Glass", "Crystal"],
        style: ["Kinetic", "Modern", "Minimalist"][i % 3],
        image: `assets/images/clay-${(i % 5) + 1}.jpg`
    })),
    // James Morgan (20% - 12 items)
    ...Array(12).fill().map((_, i) => ({
        id: `jm-${i}`,
        name: "James Morgan",
        materials: ["Wood", "Bronze", "Ceramic"][i % 3] === "Wood" ? ["Oak", "Reclaimed Wood"] : 
                   ["Wood", "Bronze", "Ceramic"][i % 3] === "Bronze" ? ["Cast Bronze"] : ["Ceramic", "Glaze"],
        style: ["Organic", "Figurative", "Textural"][i % 3],
        image: `assets/images/stone-${(i % 3) + 1}.jpg`
    }))
];

// Re-defining the list with explicit randomized variety for the UI
const finalArtists = [
    { name: "Nadine Lopez", materials: ["Bronze", "Patina"], style: "Figurative", image: "assets/images/sculpture_figurative_bronze.png" },
    { name: "Eleanor Vance", materials: ["Clay"], style: "Classical", image: "assets/images/clay-1.jpg" },
    { name: "Robert Klein", materials: ["Clay"], style: "Textural", image: "assets/images/clay-2.jpg" },
    { name: "Eleanor Vance", materials: ["Clay"], style: "Figurative", image: "assets/images/clay-3.jpg" },
    { name: "Eleanor Vance", materials: ["Clay"], style: "Portraiture", image: "assets/images/clay-5.jpg" },
    { name: "Robert Klein", materials: ["Clay"], style: "Contemporary", image: "assets/images/clay-4.jpg" },
    { name: "Julian Thorne", materials: ["Stone"], style: "Surrealist", image: "assets/images/stone-1.jpg" },
    { name: "Marcus Reid", materials: ["Stone"], style: "Expressive", image: "assets/images/stone-2.jpg" },
    { name: "Julian Thorne", materials: ["Stone"], style: "Surrealist", image: "assets/images/stone-3.jpg" },
    { name: "Eleanor Vance", materials: ["Clay"], style: "Portraiture", image: "assets/images/new-clay-bust.jpeg" },
    { name: "Robert Klein", materials: ["Clay"], style: "Contemporary", image: "assets/images/new-clay-figure.jpeg" },
    { name: "Julian Thorne", materials: ["Stone"], style: "Figurative", image: "assets/images/new-plaster-hands.jpeg" },
    { name: "Amanda Marshall", materials: ["Bronze", "Patina"], style: "Abstract", image: "assets/images/new-bronze-hands.jpeg" }
];

// Sorting the data for the UI
const sortedArtists = finalArtists;

function renderArtists(artistList) {
    const grid = document.getElementById('artistGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    artistList.forEach((artist, index) => {
        const card = document.createElement('div');
        card.className = 'artist-card fade-in';
        card.style.animationDelay = `${(index % 10) * 0.1}s`;
        
        card.innerHTML = `
            <div class="artist-img-wrapper">
                <img src="${artist.image}" alt="${artist.name}" loading="lazy">
            </div>
            <div class="artist-info">
                <h3>${artist.name}</h3>
                <span>${artist.materials.join(', ')} • ${artist.style}</span>
            </div>
        `;
        
        grid.appendChild(card);
    });

    if (artistList.length === 0) {
        grid.innerHTML = '<p class="no-results">No artists found matching your criteria.</p>';
    }
}

// Search and Filter Logic
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const filterBtns = document.querySelectorAll('.filter-btn');

    const handleSearch = () => {
        const query = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').textContent.trim();

        const filtered = sortedArtists.filter(artist => {
            const matchesQuery = artist.name.toLowerCase().includes(query) || 
                               artist.materials.some(m => m.toLowerCase().includes(query));
            const matchesFilter = activeFilter === 'All' || 
                                 artist.materials.some(m => m.includes(activeFilter)) ||
                                 artist.style.includes(activeFilter);
            return matchesQuery && matchesFilter;
        });
        renderArtists(filtered);
    };

    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            handleSearch();
        });
    });

    // Handle deep-linking from Find Sculpture page
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    
    if (filterParam && searchInput) {
        searchInput.value = filterParam;
        const matchesFilter = Array.from(filterBtns).find(btn => btn.textContent.trim().toLowerCase() === filterParam.toLowerCase());
        if (matchesFilter) {
            filterBtns.forEach(b => b.classList.remove('active'));
            matchesFilter.classList.add('active');
        }
        handleSearch();
    } else {
        renderArtists(sortedArtists);
    }
});

// Mobile menu toggle logic
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.desktop-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-active');
            const icon = toggle.querySelector('i');
            if (icon) {
                const currentIcon = icon.getAttribute('data-lucide');
                icon.setAttribute('data-lucide', currentIcon === 'menu' ? 'x' : 'menu');
                lucide.createIcons();
            }
        });
    }
});

// Nav Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.padding = '0';
        header.style.background = 'var(--glass)';
    }
});
