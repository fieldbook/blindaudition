var blinder = new Blinder({anonymousImgSrc: 'https://github.com/identicons/anyone.png'});

var fullNameElement = document.querySelector('.vcard-fullname');
var fullName = fullNameElement ? fullNameElement.innerText : false;

var userNameElement = document.querySelector('.p-nickname');
var username = userNameElement ? userNameElement.innerText : false;

blinder.blind('body', function () {
    // Remove name from tab title
    document.title = "Candidate Github Profile";
    this.blindPic('.avatar');

    this.blindElements('.h-card', function () {
        this.blindPic('.avatar');
        this.blindName('.vcard-fullname');
        
        this.blindEmail('.vcard-details [itemprop="email"]');
        this.blindLocation('.vcard-details [itemprop="homeLocation"]');
        this.blindWebsite('.vcard-details [itemprop="url"]');
    })

    // Blind elements in sticky bar
    this.blindElements('.user-profile-sticky-bar', function () {
        this.blindName('.user-profile-mini-vcard span strong');
        this.blindPic('.avatar-user');
    })

    // Blind avatar in PRs
    this.blindElements('.pull-discussion-timeline', function () {
        this.blindPic('.avatar-user img');
        this.blindPic('.avatar-user');
    })
    
    this.blindElements( '.participant-avatar', function() {
        this.blindPic('.avatar-user');
    })

    // Hide avatar in commits & Issues
    this.blindElements('.TimelineItem-body', function () {      
        this.blindPic('.avatar-user');
        this.blindPic('.avatar-user img');
    })

    this.blindElements('.AvatarStack-body', function () {      
        this.blindPic('.avatar-user img');
    })

    this.blindElements('.TimelineItem-avatar', function () {      
        this.blindPic('.avatar');
        this.blindPic('img');
    })

    // PR sidebar
    this.blindElements('.d-flex', function () {      
        this.blindPic('.avatar');
     })
    

    // Blind avatars in popups from hover actions
    this.blindElements('.Popover', function () {
        this.blindPic('.avatar-user');
        this.blindName('.Link--primary');
        this.blindName('.Link--secondary');
    })
});