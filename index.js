// ==========================================
// 1. FORMAL QUEUE DATA STRUCTURE (FIFO)
// ==========================================
class Queue {
  constructor() {
    this.items = [];
  }

  // Add an item to the rear of the queue
  enqueue(item) {
    this.items.push(item);
  }

  // Remove and return the item at the front of the queue (FIFO)
  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }

  // Examine the front item without removing it
  peek() {
    return this.isEmpty() ? null : this.items[0];
  }

  // Check if queue has zero items
  isEmpty() {
    return this.items.length === 0;
  }

  // Total count of items currently in queue
  size() {
    return this.items.length;
  }

  // Return a snapshot array of all items in the queue
  getAll() {
    return [...this.items];
  }
}

// Instantiate the primary Queue
const jobQueue = new Queue();

// ==========================================
// 2. HARDCODED INITIAL DATA (SESSION PRE-LOAD)
// ==========================================
const FALLBACK_DATA = [
  {
    "id": 1,
    "company": "Photosnap",
    "logo": "./images/photosnap.svg",
    "new": true,
    "featured": true,
    "position": "Senior Frontend Developer",
    "role": "Frontend",
    "level": "Senior",
    "postedAt": "1d ago",
    "contract": "Full Time",
    "location": "USA Only",
    "languages": ["HTML", "CSS", "JavaScript"],
    "tools": []
  },
  {
    "id": 2,
    "company": "Manage",
    "logo": "./images/manage.svg",
    "new": true,
    "featured": true,
    "position": "Fullstack Developer",
    "role": "Fullstack",
    "level": "Midweight",
    "postedAt": "1d ago",
    "contract": "Part Time",
    "location": "Remote",
    "languages": ["Python"],
    "tools": ["React"]
  },
  {
    "id": 3,
    "company": "Account",
    "logo": "./images/account.svg",
    "new": true,
    "featured": false,
    "position": "Junior Frontend Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "2d ago",
    "contract": "Part Time",
    "location": "USA Only",
    "languages": ["JavaScript"],
    "tools": ["React", "Sass"]
  },
  {
    "id": 4,
    "company": "MyHome",
    "logo": "./images/myhome.svg",
    "new": false,
    "featured": false,
    "position": "Junior Frontend Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "5d ago",
    "contract": "Contract",
    "location": "USA Only",
    "languages": ["CSS", "JavaScript"],
    "tools": []
  },
  {
    "id": 5,
    "company": "Loop Studios",
    "logo": "./images/loop-studios.svg",
    "new": false,
    "featured": false,
    "position": "Software Engineer",
    "role": "Fullstack",
    "level": "Midweight",
    "postedAt": "1w ago",
    "contract": "Full Time",
    "location": "Worldwide",
    "languages": ["JavaScript", "Ruby"],
    "tools": ["Sass"]
  },
  {
    "id": 6,
    "company": "FaceIt",
    "logo": "./images/faceit.svg",
    "new": false,
    "featured": false,
    "position": "Junior Backend Developer",
    "role": "Backend",
    "level": "Junior",
    "postedAt": "2w ago",
    "contract": "Full Time",
    "location": "UK Only",
    "languages": ["Ruby"],
    "tools": ["RoR"]
  },
  {
    "id": 7,
    "company": "Shortly",
    "logo": "./images/shortly.svg",
    "new": false,
    "featured": false,
    "position": "Junior Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "2w ago",
    "contract": "Full Time",
    "location": "Worldwide",
    "languages": ["HTML", "JavaScript"],
    "tools": ["Sass"]
  },
  {
    "id": 8,
    "company": "Insure",
    "logo": "./images/insure.svg",
    "new": false,
    "featured": false,
    "position": "Junior Frontend Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "2w ago",
    "contract": "Full Time",
    "location": "USA Only",
    "languages": ["JavaScript"],
    "tools": ["Vue", "Sass"]
  },
  {
    "id": 9,
    "company": "Eyecam Co.",
    "logo": "./images/eyecam-co.svg",
    "new": false,
    "featured": false,
    "position": "Full Stack Engineer",
    "role": "Fullstack",
    "level": "Midweight",
    "postedAt": "3w ago",
    "contract": "Full Time",
    "location": "Worldwide",
    "languages": ["JavaScript", "Python"],
    "tools": ["Django"]
  },
  {
    "id": 10,
    "company": "The Air Filter Company",
    "logo": "./images/the-air-filter-company.svg",
    "new": false,
    "featured": false,
    "position": "Front-end Dev",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "1mo ago",
    "contract": "Part Time",
    "location": "Worldwide",
    "languages": ["JavaScript"],
    "tools": ["React", "Sass"]
  }
];

const AVAILABLE_LOGOS = [
  './images/photosnap.svg',
  './images/manage.svg',
  './images/account.svg',
  './images/myhome.svg',
  './images/loop-studios.svg',
  './images/faceit.svg',
  './images/shortly.svg',
  './images/insure.svg',
  './images/eyecam-co.svg',
  './images/the-air-filter-company.svg'
];

function getRandomLogo() {
  const randomIndex = Math.floor(Math.random() * AVAILABLE_LOGOS.length);
  return AVAILABLE_LOGOS[randomIndex];
}

let activeFilters = [];

// DOM References
const jobGrid = document.getElementById('job-grid');
const filterBar = document.getElementById('filter-bar');
const filterContainer = document.getElementById('filter-container');
const clearBtn = document.getElementById('clear-btn');

// Queue UI References
const queueCountEl = document.getElementById('queue-count');
const queueFrontPreviewEl = document.getElementById('queue-front-preview');
const toggleEnqueueBtn = document.getElementById('toggle-enqueue-btn');
const dequeueBtn = document.getElementById('dequeue-btn');
const jobForm = document.getElementById('job-form');
const cancelFormBtn = document.getElementById('cancel-form-btn');

// ==========================================
// 3. INITIALIZATION & DATA LOADING
// ==========================================
async function initQueueSession() {
  let initialData = [];
  try {
    const response = await fetch('./data.json');
    if (!response.ok) throw new Error('Network response not ok');
    initialData = await response.json();
  } catch (error) {
    console.warn('Using pre-bundled initial data:', error);
    initialData = FALLBACK_DATA;
  }

  // Enqueue initial hardcoded jobs into the queue
  initialData.forEach(job => jobQueue.enqueue(job));

  updateQueueStatus();
  applyFiltering();
}

// Update Queue visual metrics
function updateQueueStatus() {
  const currentSize = jobQueue.size();
  queueCountEl.textContent = currentSize;

  const frontJob = jobQueue.peek();
  if (frontJob) {
    queueFrontPreviewEl.innerHTML = `Front: <strong>${frontJob.company}</strong> (${frontJob.position})`;
    dequeueBtn.disabled = false;
    dequeueBtn.style.opacity = '1';
    dequeueBtn.style.cursor = 'pointer';
  } else {
    queueFrontPreviewEl.innerHTML = `Front: <em>Queue is Empty</em>`;
    dequeueBtn.disabled = true;
    dequeueBtn.style.opacity = '0.5';
    dequeueBtn.style.cursor = 'not-allowed';
  }
}

function getJobTags(job) {
  return [
    job.role,
    job.level,
    ...(job.languages || []),
    ...(job.tools || [])
  ];
}

// ==========================================
// 4. RENDERING THE QUEUE ON SCREEN
// ==========================================
function renderJobs(jobs) {
  jobGrid.innerHTML = '';

  if (jobs.length === 0) {
    const isQueueEmpty = jobQueue.isEmpty();
    jobGrid.innerHTML = `
      <div class="job-card" style="justify-content: center; text-align: center; padding: 40px;">
        <p style="color: var(--neutral-gray); font-size: 16px;">
          ${isQueueEmpty ? 'The Queue is currently empty. Use "+ Enqueue Job" to add jobs.' : 'No queued jobs match the active filters.'}
        </p>
      </div>
    `;
    return;
  }

  const frontJob = jobQueue.peek();

  jobs.forEach(job => {
    const isFront = frontJob && frontJob.id === job.id;
    const featuredClass = job.featured ? 'featured' : '';
    const frontClass = isFront ? 'front-of-queue' : '';
    const tags = getJobTags(job);
    const tagsHTML = tags
      .map(tag => `<button class="tag-btn" type="button">${tag}</button>`)
      .join('');

    const cardHTML = `
      <article class="job-card ${featuredClass} ${frontClass}" data-id="${job.id}">
        <div class="job-details">
          <img class="company-logo" src="${job.logo || './images/photosnap.svg'}" alt="${job.company} logo" onerror="this.src='./images/photosnap.svg'">
          <div class="job-info">
            <div class="job-meta-top">
              <span class="company-name">${job.company}</span>
              ${isFront ? '<span class="queue-tag front">Queue: Front (#1)</span>' : '<span class="queue-tag">In Queue</span>'}
              ${job.new ? '<span class="badge-new">New!</span>' : ''}
              ${job.featured ? '<span class="badge-featured">Featured</span>' : ''}
            </div>
            <h2 class="job-position">${job.position}</h2>
            <div class="job-meta-bottom">
              <span>${job.postedAt || 'Just now'}</span>
              <span class="dot"></span>
              <span>${job.contract}</span>
              <span class="dot"></span>
              <span>${job.location}</span>
            </div>
          </div>
        </div>
        <hr class="job-divider">
        <div class="job-tags">
          ${tagsHTML}
        </div>
      </article>
    `;
    jobGrid.insertAdjacentHTML('beforeend', cardHTML);
  });
}

// ==========================================
// 5. QUEUE CONTROLS: ENQUEUE & DEQUEUE
// ==========================================

// Toggle Enqueue Form
toggleEnqueueBtn.addEventListener('click', () => {
  const isHidden = jobForm.style.display === 'none' || jobForm.style.display === '';
  jobForm.style.display = isHidden ? 'block' : 'none';
  if (isHidden) {
    jobForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    document.getElementById('company').focus();
  }
});

// Cancel Form
cancelFormBtn.addEventListener('click', () => {
  jobForm.reset();
  jobForm.style.display = 'none';
});

// Form Submission -> ENQUEUE
jobForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const company = document.getElementById('company').value.trim();
  const position = document.getElementById('position').value.trim();
  const role = document.getElementById('role').value;
  const level = document.getElementById('level').value;
  const contract = document.getElementById('contract').value;
  const location = document.getElementById('location').value.trim();
  const rawTags = document.getElementById('tags').value.trim();
  const isNew = document.getElementById('is-new').checked;
  const isFeatured = document.getElementById('is-featured').checked;

  const parsedTags = rawTags ? rawTags.split(',').map(t => t.trim()).filter(Boolean) : [];

  const newJob = {
    id: Date.now(),
    company,
    position,
    role,
    level,
    contract,
    location,
    postedAt: 'Just now',
    logo: getRandomLogo(),
    new: isNew,
    featured: isFeatured,
    languages: parsedTags,
    tools: []
  };

  // ENQUEUE INTO THE QUEUE DATA STRUCTURE
  jobQueue.enqueue(newJob);

  // Reset & hide form
  jobForm.reset();
  jobForm.style.display = 'none';

  // Update UI
  updateQueueStatus();
  applyFiltering();
});

// DEQUEUE: Remove the oldest job from the front of the queue (FIFO)
dequeueBtn.addEventListener('click', () => {
  if (jobQueue.isEmpty()) {
    alert('The queue is empty! Nothing to dequeue.');
    return;
  }

  const dequeuedJob = jobQueue.dequeue();
  console.log('Dequeued job (FIFO):', dequeuedJob);

  updateQueueStatus();
  applyFiltering();
});

// ==========================================
// 6. FILTERING
// ==========================================
function renderFilterBar() {
  if (activeFilters.length === 0) {
    filterBar.classList.remove('active');
    filterContainer.innerHTML = '';
    return;
  }

  filterBar.classList.add('active');
  const tabsHTML = activeFilters
    .map(filter => `
      <div class="filter-tab">
        <span class="filter-tab-text">${filter}</span>
        <button class="filter-tab-remove" data-filter="${filter}" type="button" aria-label="Remove ${filter} filter">
          <img src="images/icon-remove.svg" alt="">
        </button>
      </div>
    `)
    .join('');

  filterContainer.innerHTML = tabsHTML;
}

function applyFiltering() {
  const currentQueueItems = jobQueue.getAll();

  if (activeFilters.length === 0) {
    renderJobs(currentQueueItems);
    return;
  }

  const filtered = currentQueueItems.filter(job => {
    const jobTags = getJobTags(job);
    return activeFilters.every(filter => jobTags.includes(filter));
  });

  renderJobs(filtered);
}

// Event Delegation for Tag clicks on Job Cards
jobGrid.addEventListener('click', (event) => {
  const tagBtn = event.target.closest('.tag-btn');
  if (!tagBtn) return;

  const tagValue = tagBtn.textContent.trim();
  if (!activeFilters.includes(tagValue)) {
    activeFilters.push(tagValue);
    renderFilterBar();
    applyFiltering();
  }
});

// Remove single filter
filterBar.addEventListener('click', (event) => {
  const removeBtn = event.target.closest('.filter-tab-remove');
  if (!removeBtn) return;

  const tagToRemove = removeBtn.dataset.filter;
  activeFilters = activeFilters.filter(tag => tag !== tagToRemove);
  renderFilterBar();
  applyFiltering();
});

// Clear All Filters
clearBtn.addEventListener('click', () => {
  activeFilters = [];
  renderFilterBar();
  applyFiltering();
});

// Start session
initQueueSession();
