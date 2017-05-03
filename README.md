MinimalTimeline.js
==================
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![MIT](https://img.shields.io/dub/l/vibe-d.svg)](https://github.com/alexprut/TextShuffle.js/blob/master/LICENSE)  

> Minimal Timeline UI component for the web  

Live demo: [http://alexprut.github.io/MinimalTimeline.js](http://alexprut.github.io/MinimalTimeline.js)

![Demo - MinimalTimeline.js](https://github.com/alexprut/MinimalTimeline.js/raw/master/img/demo.jpg)

##  Installation
* __Bower__:  
    Run from your console/terminal ```bower install minimal-timeline.js --save-dev```
* __From Source__:  
    Run ```git clone https://github.com/alexprut/MinimalTimeline.js.git```
* __Direct download__:  
    Download the last version from [here](https://github.com/alexprut/MinimalTimeline.js/archive/master.zip "download")

## Usage
```html
<div class="timeline">
    <div class="legend timeline__legend clearfix">
        <a class="legend__link legend__link_border_blue" href="#" data-type="event">example</a>
        <a class="legend__link" href="#" data-type="big-goal">example</a>
        <a class="legend__link legend__link_border_yellow" href="#" data-type="book">example</a>
    </div>
    <div class="timeline__content">
        <div class="timeline-details">
            <span class="timeline-details__head"></span>
            <span class="timeline-details__tail"></span>
        </div>
        <div class="timeline-block clearfix" data-year="2016">
            <div class="timeline-block__date hidden">2016</div>
            <div class="timeline-box timeline-box_border_yellow" data-end="current" data-type="book">
                <span class="timeline-box__title">
                    <a target="_blank" href="#example">
                        example
                    </a>
                </span>
                <span class="timeline-box__date">example</span>
            </div>
        </div>
    </div>
    <button class="timeline__button">more</button>
</div>

<script>
    $(function () {
        $('.timeline').timeline({isOneDeep: false});
    });
</script>
```

For a complete example see [index.html](https://github.com/alexprut/MinimalTimeline.js/blob/staging/index.html)

#### Parameters
|Name|Type|Description|Default|
|----|----|-----------|-------|
|```isOneDeep```|```bool```|to force or not the mode button to show all the entries with one click|```false```|

## License
MinimalTimeline.js is licensed under the MIT License – see the LICENSE file for details.
