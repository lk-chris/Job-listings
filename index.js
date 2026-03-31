async function loadListings(){
    try {
        const response = await fetch('./data.json');
        const data = await response.json();

        renderJobs(data);
        console.log('data recieved', data);
    }catch(error){
        console.error('Ooops failed to load data', error);
    }
}
loadListings();

function renderJobs(jobs){
    const jobGrid = document.querySelector('.job-grid');
    jobGrid.innerHTML = "";

    jobs.forEach (job => {
        const featuredClass = job.featured ? 'featured-border' : '';
        const tags = [
            job.role,
            job.level,
            ...job.languages,
            ...job.tools
        ]
        const tagsHTML = tags.map(tag => `<button class="filter-button">${tag}</button>`).join('')

        const cardHTML = `
            <div class="job-card ${featuredClass}">
                <div class="lhs">
                    <div class="img">
                    <img src="${job.logo}" alt="">
                </div>
                <div class="job-info">
                    <div class="job-info-top">
                    <p class="company-name">Photosnap</p>
                    ${job.new ? '<button class="btn-new">NEW!</button>' : ''}
                    ${job.featured ? '<button class="btn-featured">FEATURED</button>' : ''}
                    </div>
                    <div class="job-info-mid">
                    <p class="position">${job.position}</p>
                    </div>
                    <div class="job-info-bottom">
                    <p class="time-since-post">${job.postedAt}</p>
                    <span></span>
                    <p class="job-period">${job.contract}</p>
                    <span></span>
                    <p class="job-classification">${job.location}</p>
                    </div>
                </div>
                </div>
                
                <div class="filter-items">
                    ${tagsHTML}
                </div>
            </div>
        `;
        jobGrid.insertAdjacentHTML('beforeend', cardHTML);
        console.log("Building out job")
    });
}