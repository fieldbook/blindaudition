var blinder = new Blinder({anonymousImgSrc: 'https://github.com/identicons/anyone.png'});

var fullNameElement = document.querySelector('.vcard-fullname');
var fullName = fullNameElement ? fullNameElement.innerText : false;

var userNameElement = document.querySelector('.p-nickname');
var username = userNameElement ? userNameElement.innerText : false;

blinder.blind('body', function () {
    // remove name from tab title
    document.title = "Candidate Github Profile";

    this.blindElements('.h-card', function () {
        this.blindPic('.avatar');
        this.blindName('.vcard-fullname');
        // this.blindName('.p-nickname');
        
        this.blindEmail('.vcard-details [itemprop="email"]');
        this.blindLocation('.vcard-details [itemprop="homeLocation"]');
        this.blindWebsite('.vcard-details [itemprop="url"]');
    })

    // blind username in sticky bar
    this.blindElements('.user-profile-sticky-bar', function () {
        this.blindName('.user-profile-mini-vcard span strong');
        this.blindPic('.avatar-user');
    })

    // blind avatar in PRs
    this.blindElements('.pull-discussion-timeline', function () {
        this.blindElements('.TimelineItem', function () {
            this.blindPic('.avatar-user');
        })
        this.blindElements('.timeline-comment-group', function () {
            this.blindName('.Link--primary');
            this.blindPic('.avatar-user');
        })
    })

    // Hide avatar in commits
    this.blindElements('.TimelineItem-body', function () {      
        this.blindElements('.Box-row', function () {
            this.blindPic('.avatar-user img');
        });
    })

    // Hide avatar in commits
    this.blindElements('.AvatarStack-body', function () {      
        this.blindPic('.avatar-user img');
    })

    // blind avatars in popups from hover actions
    this.blindElements('.Popover', function () {
        this.blindPic('.avatar-user');
        this.blindName('.Link--primary');
        this.blindName('.Link--secondary');
    })
});