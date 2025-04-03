// for markdown code render
marked.setOptions({
    highlight: function(code, lang) {
        const language = lang || 'javascript';
        try {
            return hljs.highlight(code, { language }).value;
        } catch (e) {
            console.error('Highlight.js error:', e);
            return code;
        }
    }
});

function toggleBlog(blogId, blogFile) {
    const content = document.getElementById(`content-${blogId}`);
    const button = document.querySelector(`#${blogId} .toggle-btn`);

    // If the blog content is already loaded, toggle the display state directly
    if (content.innerHTML.trim() === '') {
        loadBlogContent(blogFile, `content-${blogId}`);
    }


    if (content.style.display === 'none') {
        content.style.display = 'block';
        button.innerHTML = '<span class="triangle-up"></span>'; // Show the upward triangle
    } else {
        content.style.display = 'none';
        button.innerHTML = '<span class="triangle-down"></span>'; // Show the downward triangle
    }
}

function loadBlogContent(blogName, contentId) {
    fetch(`./blogs/${blogName}`)
        .then(response => response.text())
        .then(mdContent => {
            const htmlContent = marked.parse(mdContent); // Convert Markdown using marked.js
            document.getElementById(contentId).innerHTML = htmlContent;


            setTimeout(() => {
                hljs.highlightAll(); // for markdown code render
            }, 100);
        })
        .catch(error => console.error('Failed to load blog content:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contents = document.querySelectorAll('.content');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove all active states
            navLinks.forEach(nav => nav.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));

            // Add active state to the clicked item
            link.classList.add('active');
            const contentId = link.getAttribute('data-content');
            document.getElementById(contentId).classList.add('active');


            // If it's the blog page, load the blogs
            if (contentId === 'blogs') {
                generateBlogs();
            }

        });
    });


    function generateBlogs() {
        const blogContainer = document.getElementById('blog-container');

        blogContainer.innerHTML = '';

        // When adding a new blog, simply update this array
        // All blog files are stored in the /blogs folder
        const blogFiles = [
            'How to Deploy a Full-Stack App on Vercel.md',
            'Data Science NumPy.md',
            'Data Science Pandas.md'

        ];

        blogFiles.forEach((blogFile, index) => {
            // Create a div for each blog
            const blogDiv = document.createElement('div');
            blogDiv.classList.add('blog');
            blogDiv.id = `blog${index + 1}`; // Generate a unique ID for each blog

            // Create the blog title and triangle button
            const blogHeader = document.createElement('div');
            blogHeader.classList.add('blog-header');

            const blogTitle = document.createElement('h2');
            blogTitle.classList.add('blog-title');
            blogTitle.textContent = blogFile.replace('.md', '');
            blogTitle.setAttribute('data-blog', blogFile);

            const toggleButton = document.createElement('button');
            toggleButton.classList.add('toggle-btn');
            toggleButton.innerHTML = '<span class="triangle-down"></span>';
            toggleButton.setAttribute('onclick', `toggleBlog('blog${index + 1}', '${blogFile}')`);

            blogHeader.appendChild(blogTitle);
            blogHeader.appendChild(toggleButton);


            const blogContent = document.createElement('div');
            blogContent.classList.add('blog-content');
            blogContent.id = `content-blog${index + 1}`;


            blogDiv.appendChild(blogHeader);
            blogDiv.appendChild(blogContent);


            blogContainer.appendChild(blogDiv);



        });
    }

});
