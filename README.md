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
    <div class="legend clearfix">
        <a class="blue" href="#" data-type="event">example</a>
        <a href="#" data-type="big-goal">example</a>
        <a class="yellow" href="#" data-type="book">example</a>
    </div>
    <div class="content">
        <div class="details">
            <span class="head"></span>
            <span class="tail"></span>
        </div>
        <div class="block clearfix" data-year="2016">
            <div class="box-date hidden">2016</div>
            <div class="box yellow" data-end="current" data-type="book">
                <span class="title">
                    <a target="_blank" href="#example">
                        example
                    </a>
                </span>
                <span class="date">example</span>
            </div>
        </div>
    </div>
</div>
<button>more</button>

<script>
    $(function () {
        $('.timeline').timeline();
    });
</script>
```

For a complete example see [index.html](https://github.com/alexprut/MinimalTimeline.js/blob/staging/index.html)

#### Parameters
|Name|Type|Description|Default|
|----|----|-----------|-------|
|isOneDeep|bool|to force or not the mode button to show all the entries with one click|false|

## License
MinimalTimeline.js is licensed under the MIT License – see the LICENSE file for details.
