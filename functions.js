(function($) {
    "use strict";

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 60
    });

    $('#topNav').affix({
        offset: {
            top: 200
        }
    });
    
    new WOW().init();
    
    $('a.page-scroll').bind('click', function(event) {
        var $ele = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($ele.attr('href')).offset().top - 60)
        }, 1450, 'easeInOutExpo');
        event.preventDefault();
    });
    
    $('.navbar-collapse ul li a').click(function() {
        
        $('.navbar-toggle:visible').click();
    });

    $('#galleryModal').on('show.bs.modal', function (e) {
       $('#galleryImage').attr("src",$(e.relatedTarget).data("src"));
    });
})(jQuery);

function gatherEmailData() {
	return {
		name: document.getElementById('email-name').value,
		mailfrom: document.getElementById('email-mailfrom').value,
		msisdn: document.getElementById('email-msisdn').value,
		content: document.getElementById('email-content').value,
		adr: document.getElementById('field5').value,
	};
}

function handleEmailDisabled() {
	let valid = isEmailValid();
	
	document.getElementById('email-submit').disabled = !valid;
}

function isEmailValid() {
	let data = gatherEmailData();

	return Boolean(data.name) && Boolean(data.mailfrom) && Boolean(data.msisdn) && Boolean(data.content);
}


function sendEmail() {
	let data = gatherEmailData();

	Email.send(
		'foxturas.mail@gmail.com',
		'foxturas.mail@gmail.com',
		'Užklausa. Vardas - ' + data.name + ', el. paštas - ' + data.mailfrom + ', tel. numeris - ' + data.msisdn + ', Adresas - '+ adr,
		data.content,
		{
			token: '05f8ad26-0e41-43ba-8323-84254009abaf'
		}
	);
}

let nova_iframe_options = {
	'baseUrl': 'https://www.novaturas.lt/?step=',
	'target': 'https://www.novaturas.lt/paieska/index/step1/search/s_travel_type/beach/s_adults/2/s_childs/0/s_childs_age/1/s_price_for/person/s_sort/region_asc', // url to open, how to form url see ..
	'wid' : 'foxturas1'
};

(function(d, t, o, u){
	var e = d.createElement(t),
	s = d.getElementsByTagName(t)[0];
	e.src = u;
	s.parentNode.insertBefore(e, s);
})(document, 'script', nova_iframe_options, 'https://www.novaturas.lt/js/remote/iframe.js');

setTimeout(function(){ $('iframe').attr('scrolling','yes'); }, 5000);

$(document).ready(function () {	
    
    var sIntegrationUrl = 'https://www.novaturas.lt/paieska/';    
    var sTDUID = ""; 
    var sDivBestOffers4CountryId = 'contentItems';
    var addBestOffers4CountryLine = function (sDivBestOffers4CountryId, oOfferInfo) {
        
        var sLink = sIntegrationUrl+'index/step2/show/dc/'+oOfferInfo.Country_code+'/c/'+oOfferInfo.City_code+'/s_dep_date_from/'+oOfferInfo.Date+'/s_dep_date_to/'+oOfferInfo.Date+'/s_dep_date/'+oOfferInfo.Date+'/s_dep_date_round/0/s_adults/2/s_childs/0/s_childs_age/1/s_price_from/30/s_price_to/10000/s_price_for/person/s_sort/price_asc';

       
        if (sTDUID && sTDUID!='') {
            sLink = sLink + '&search[s_tduid]=' + sTDUID;
        }
       
        var sHtml = '<div class="contentItemBlock col-md-3">'
                           +'<div class="contentItemLeft"><a href="'+sLink+'"><span class="strongText">'+oOfferInfo.Country+'</span>'+(oOfferInfo.City && oOfferInfo.City!=oOfferInfo.Country ? ', '+oOfferInfo.City : '')+'</a></div>'
                           +'<div class="contentItemRight">nuo '+oOfferInfo.Price+' Eur</div>'
                           +'<div class="contentItemClear"></div>'
                           +'</div>';
        $(sHtml).appendTo("#"+sDivBestOffers4CountryId);
    }

    
    if (best_offers_for_country) {
        $(best_offers_for_country).each(function (index, domEle) {
            addBestOffers4CountryLine(sDivBestOffers4CountryId, domEle);
            });
        }
	
});