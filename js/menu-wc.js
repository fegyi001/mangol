'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">mangol-app documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/ControllersModule.html" data-type="entity-link">ControllersModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ControllersModule-f94111b0ff62a3dea6edd14393826a25"' : 'data-target="#xs-components-links-module-ControllersModule-f94111b0ff62a3dea6edd14393826a25"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ControllersModule-f94111b0ff62a3dea6edd14393826a25"' : 'id="xs-components-links-module-ControllersModule-f94111b0ff62a3dea6edd14393826a25"' }>
                                        <li class="link">
                                            <a href="components/ControllersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ControllersComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CursorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CursorComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FullscreenButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FullscreenButtonComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/PositionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PositionComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/RotationButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RotationButtonComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ScalebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ScalebarComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SidebarButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarButtonComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ZoomButtonsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ZoomButtonsComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/EditModule.html" data-type="entity-link">EditModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-EditModule-995958f78a4811f197138c92cdef982b"' : 'data-target="#xs-components-links-module-EditModule-995958f78a4811f197138c92cdef982b"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-EditModule-995958f78a4811f197138c92cdef982b"' : 'id="xs-components-links-module-EditModule-995958f78a4811f197138c92cdef982b"' }>
                                        <li class="link">
                                            <a href="components/EditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/FeatureinfoModule.html" data-type="entity-link">FeatureinfoModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-FeatureinfoModule-f8085927a1fc048f6e0675b4f2134afe"' : 'data-target="#xs-components-links-module-FeatureinfoModule-f8085927a1fc048f6e0675b4f2134afe"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-FeatureinfoModule-f8085927a1fc048f6e0675b4f2134afe"' : 'id="xs-components-links-module-FeatureinfoModule-f8085927a1fc048f6e0675b4f2134afe"' }>
                                        <li class="link">
                                            <a href="components/FeatureinfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FeatureinfoComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FeatureinfoResultsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FeatureinfoResultsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FeatureinfoSelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FeatureinfoSelectComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FeatureinfoTableDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FeatureinfoTableDialogComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FeaturenfoTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FeaturenfoTableComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-FeatureinfoModule-f8085927a1fc048f6e0675b4f2134afe"' : 'data-target="#xs-injectables-links-module-FeatureinfoModule-f8085927a1fc048f6e0675b4f2134afe"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-FeatureinfoModule-f8085927a1fc048f6e0675b4f2134afe"' : 'id="xs-injectables-links-module-FeatureinfoModule-f8085927a1fc048f6e0675b4f2134afe"' }>
                                        <li class="link">
                                            <a href="injectables/FeatureinfoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>FeatureinfoService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/LayertreeModule.html" data-type="entity-link">LayertreeModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-LayertreeModule-ecaa743a6cf825fe4c57dd9ba476f571"' : 'data-target="#xs-components-links-module-LayertreeModule-ecaa743a6cf825fe4c57dd9ba476f571"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-LayertreeModule-ecaa743a6cf825fe4c57dd9ba476f571"' : 'id="xs-components-links-module-LayertreeModule-ecaa743a6cf825fe4c57dd9ba476f571"' }>
                                        <li class="link">
                                            <a href="components/DescriptionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DescriptionComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LayerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayerComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LayerDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayerDetailsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LayerGroupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayerGroupComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LayertreeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayertreeComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LayertreeItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayertreeItemComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LegendComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LegendComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TransparencyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TransparencyComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/MangolModule.html" data-type="entity-link">MangolModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-MangolModule-c75f3225ac76473764e5e269484a2c85"' : 'data-target="#xs-components-links-module-MangolModule-c75f3225ac76473764e5e269484a2c85"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-MangolModule-c75f3225ac76473764e5e269484a2c85"' : 'id="xs-components-links-module-MangolModule-c75f3225ac76473764e5e269484a2c85"' }>
                                        <li class="link">
                                            <a href="components/MangolComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MangolComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-MangolModule-c75f3225ac76473764e5e269484a2c85"' : 'data-target="#xs-injectables-links-module-MangolModule-c75f3225ac76473764e5e269484a2c85"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-MangolModule-c75f3225ac76473764e5e269484a2c85"' : 'id="xs-injectables-links-module-MangolModule-c75f3225ac76473764e5e269484a2c85"' }>
                                        <li class="link">
                                            <a href="injectables/MeasureService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>MeasureService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/MapModule.html" data-type="entity-link">MapModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-MapModule-d31198ad48ab70d67fa044a5ba058de0"' : 'data-target="#xs-components-links-module-MapModule-d31198ad48ab70d67fa044a5ba058de0"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-MapModule-d31198ad48ab70d67fa044a5ba058de0"' : 'id="xs-components-links-module-MapModule-d31198ad48ab70d67fa044a5ba058de0"' }>
                                        <li class="link">
                                            <a href="components/MapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MapComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/MeasureModule.html" data-type="entity-link">MeasureModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-MeasureModule-ee8784319db000a529567048e7fb8c4c"' : 'data-target="#xs-components-links-module-MeasureModule-ee8784319db000a529567048e7fb8c4c"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-MeasureModule-ee8784319db000a529567048e7fb8c4c"' : 'id="xs-components-links-module-MeasureModule-ee8784319db000a529567048e7fb8c4c"' }>
                                        <li class="link">
                                            <a href="components/MeasureComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MeasureComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/MeasureResultsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MeasureResultsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/MeasureSelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MeasureSelectComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/PrintModule.html" data-type="entity-link">PrintModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-PrintModule-d39c1458a62a781c11e0e87c519b8573"' : 'data-target="#xs-components-links-module-PrintModule-d39c1458a62a781c11e0e87c519b8573"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-PrintModule-d39c1458a62a781c11e0e87c519b8573"' : 'id="xs-components-links-module-PrintModule-d39c1458a62a781c11e0e87c519b8573"' }>
                                        <li class="link">
                                            <a href="components/PrintComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrintComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-SharedModule-e34df982df436b55eafcd55b193d14d7"' : 'data-target="#xs-injectables-links-module-SharedModule-e34df982df436b55eafcd55b193d14d7"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-SharedModule-e34df982df436b55eafcd55b193d14d7"' : 'id="xs-injectables-links-module-SharedModule-e34df982df436b55eafcd55b193d14d7"' }>
                                        <li class="link">
                                            <a href="injectables/StyleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>StyleService</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#pipes-links-module-SharedModule-e34df982df436b55eafcd55b193d14d7"' : 'data-target="#xs-pipes-links-module-SharedModule-e34df982df436b55eafcd55b193d14d7"' }>
                                    <span class="icon ion-md-add"></span>
                                    <span>Pipes</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="pipes-links-module-SharedModule-e34df982df436b55eafcd55b193d14d7"' : 'id="xs-pipes-links-module-SharedModule-e34df982df436b55eafcd55b193d14d7"' }>
                                        <li class="link">
                                            <a href="pipes/KeysPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">KeysPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/ShortenPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShortenPipe</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/TabsModule.html" data-type="entity-link">TabsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-TabsModule-636695226582d31bd07b89c1ac19432a"' : 'data-target="#xs-components-links-module-TabsModule-636695226582d31bd07b89c1ac19432a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-TabsModule-636695226582d31bd07b89c1ac19432a"' : 'id="xs-components-links-module-TabsModule-636695226582d31bd07b89c1ac19432a"' }>
                                        <li class="link">
                                            <a href="components/TabsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TabsComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/AddLayers.html" data-type="entity-link">AddLayers</a>
                    </li>
                    <li class="link">
                        <a href="classes/AddMap.html" data-type="entity-link">AddMap</a>
                    </li>
                    <li class="link">
                        <a href="classes/ClearState.html" data-type="entity-link">ClearState</a>
                    </li>
                    <li class="link">
                        <a href="classes/HasFeatureinfo.html" data-type="entity-link">HasFeatureinfo</a>
                    </li>
                    <li class="link">
                        <a href="classes/HasLayertree.html" data-type="entity-link">HasLayertree</a>
                    </li>
                    <li class="link">
                        <a href="classes/HasMeasure.html" data-type="entity-link">HasMeasure</a>
                    </li>
                    <li class="link">
                        <a href="classes/HasPrint.html" data-type="entity-link">HasPrint</a>
                    </li>
                    <li class="link">
                        <a href="classes/LayertreeItemNode.html" data-type="entity-link">LayertreeItemNode</a>
                    </li>
                    <li class="link">
                        <a href="classes/MangolLayer.html" data-type="entity-link">MangolLayer</a>
                    </li>
                    <li class="link">
                        <a href="classes/MangolLayerGroup.html" data-type="entity-link">MangolLayerGroup</a>
                    </li>
                    <li class="link">
                        <a href="classes/MangolMap.html" data-type="entity-link">MangolMap</a>
                    </li>
                    <li class="link">
                        <a href="classes/Reset.html" data-type="entity-link">Reset</a>
                    </li>
                    <li class="link">
                        <a href="classes/ResetMode.html" data-type="entity-link">ResetMode</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetCollapsible.html" data-type="entity-link">SetCollapsible</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetConfig.html" data-type="entity-link">SetConfig</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetDictionary.html" data-type="entity-link">SetDictionary</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetDictionary-1.html" data-type="entity-link">SetDictionary</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetDictionary-2.html" data-type="entity-link">SetDictionary</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetDictionary-3.html" data-type="entity-link">SetDictionary</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetDisabled.html" data-type="entity-link">SetDisabled</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetDisabled-1.html" data-type="entity-link">SetDisabled</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetDisabled-2.html" data-type="entity-link">SetDisabled</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetDisabled-3.html" data-type="entity-link">SetDisabled</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetFullscreenDictionary.html" data-type="entity-link">SetFullscreenDictionary</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetHasSidebar.html" data-type="entity-link">SetHasSidebar</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetHoverColor.html" data-type="entity-link">SetHoverColor</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetLayer.html" data-type="entity-link">SetLayer</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetLayers.html" data-type="entity-link">SetLayers</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetLayouts.html" data-type="entity-link">SetLayouts</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetMaxFeatures.html" data-type="entity-link">SetMaxFeatures</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetMeasureLayer.html" data-type="entity-link">SetMeasureLayer</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetMode.html" data-type="entity-link">SetMode</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetMode-1.html" data-type="entity-link">SetMode</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetMode-2.html" data-type="entity-link">SetMode</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetOpened.html" data-type="entity-link">SetOpened</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetPositionCoordinates.html" data-type="entity-link">SetPositionCoordinates</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetPositionDictionary.html" data-type="entity-link">SetPositionDictionary</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetPositionPrecision.html" data-type="entity-link">SetPositionPrecision</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetResolutions.html" data-type="entity-link">SetResolutions</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetResultsItems.html" data-type="entity-link">SetResultsItems</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetResultsLayer.html" data-type="entity-link">SetResultsLayer</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetRotationDictionary.html" data-type="entity-link">SetRotationDictionary</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetRotationValue.html" data-type="entity-link">SetRotationValue</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetScalebar.html" data-type="entity-link">SetScalebar</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetSelectedLayer.html" data-type="entity-link">SetSelectedLayer</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetSelectedLayout.html" data-type="entity-link">SetSelectedLayout</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetSelectedModule.html" data-type="entity-link">SetSelectedModule</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetSelectedResolution.html" data-type="entity-link">SetSelectedResolution</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetSelectedSize.html" data-type="entity-link">SetSelectedSize</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetShowFullscreen.html" data-type="entity-link">SetShowFullscreen</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetShowFullscreenTooltip.html" data-type="entity-link">SetShowFullscreenTooltip</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetShowPosition.html" data-type="entity-link">SetShowPosition</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetShowRotation.html" data-type="entity-link">SetShowRotation</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetShowRotationTooltip.html" data-type="entity-link">SetShowRotationTooltip</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetShowTooltip.html" data-type="entity-link">SetShowTooltip</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetShowZoom.html" data-type="entity-link">SetShowZoom</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetSizes.html" data-type="entity-link">SetSizes</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetTitle.html" data-type="entity-link">SetTitle</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetTitle-1.html" data-type="entity-link">SetTitle</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetTitle-2.html" data-type="entity-link">SetTitle</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetTitle-3.html" data-type="entity-link">SetTitle</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetTitle-4.html" data-type="entity-link">SetTitle</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetVisible.html" data-type="entity-link">SetVisible</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetZoomDictionary.html" data-type="entity-link">SetZoomDictionary</a>
                    </li>
                    <li class="link">
                        <a href="classes/ShowLayergroupBadges.html" data-type="entity-link">ShowLayergroupBadges</a>
                    </li>
                    <li class="link">
                        <a href="classes/Toggle.html" data-type="entity-link">Toggle</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/FeatureinfoService.html" data-type="entity-link">FeatureinfoService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/LayertreeService.html" data-type="entity-link">LayertreeService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/MangolService.html" data-type="entity-link">MangolService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/MapService.html" data-type="entity-link">MapService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/MeasureService.html" data-type="entity-link">MeasureService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/StyleService.html" data-type="entity-link">StyleService</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/ControllersStateModel.html" data-type="entity-link">ControllersStateModel</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/CursorMode.html" data-type="entity-link">CursorMode</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/FeatureinfoDictionary.html" data-type="entity-link">FeatureinfoDictionary</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/FsDocument.html" data-type="entity-link">FsDocument</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/FsDocumentElement.html" data-type="entity-link">FsDocumentElement</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/LayerDetailItem.html" data-type="entity-link">LayerDetailItem</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/LayerGroupDetailItem.html" data-type="entity-link">LayerGroupDetailItem</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/LayertreeDictionary.html" data-type="entity-link">LayertreeDictionary</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Layout.html" data-type="entity-link">Layout</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolConfig.html" data-type="entity-link">MangolConfig</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolConfigFeatureInfoItem.html" data-type="entity-link">MangolConfigFeatureInfoItem</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolConfigLayer.html" data-type="entity-link">MangolConfigLayer</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolConfigLayer2.html" data-type="entity-link">MangolConfigLayer2</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolConfigLayerColumn.html" data-type="entity-link">MangolConfigLayerColumn</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolConfigLayerGroup.html" data-type="entity-link">MangolConfigLayerGroup</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolConfigLayerGroup-1.html" data-type="entity-link">MangolConfigLayerGroup</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolConfigLayertree.html" data-type="entity-link">MangolConfigLayertree</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolConfigLayertreeItem.html" data-type="entity-link">MangolConfigLayertreeItem</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolConfigMap.html" data-type="entity-link">MangolConfigMap</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolConfigMapControllers.html" data-type="entity-link">MangolConfigMapControllers</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolConfigMapMousePosition.html" data-type="entity-link">MangolConfigMapMousePosition</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolConfigMeasureItem.html" data-type="entity-link">MangolConfigMeasureItem</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolConfigPrintItem.html" data-type="entity-link">MangolConfigPrintItem</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolConfigSidebar.html" data-type="entity-link">MangolConfigSidebar</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolConfigToolbar.html" data-type="entity-link">MangolConfigToolbar</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolConfigToolbarItem.html" data-type="entity-link">MangolConfigToolbarItem</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolConfigToolbarLayertreeDetails.html" data-type="entity-link">MangolConfigToolbarLayertreeDetails</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolConfigView.html" data-type="entity-link">MangolConfigView</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolControllersFullScreenDictionary.html" data-type="entity-link">MangolControllersFullScreenDictionary</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolControllersFullScreenOptions.html" data-type="entity-link">MangolControllersFullScreenOptions</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolControllersOptions.html" data-type="entity-link">MangolControllersOptions</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolControllersPositionDictionary.html" data-type="entity-link">MangolControllersPositionDictionary</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolControllersPositionOptions.html" data-type="entity-link">MangolControllersPositionOptions</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolControllersPositionStateModel.html" data-type="entity-link">MangolControllersPositionStateModel</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolControllersRotationDictionary.html" data-type="entity-link">MangolControllersRotationDictionary</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolControllersRotationOptions.html" data-type="entity-link">MangolControllersRotationOptions</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolControllersRotationStateModel.html" data-type="entity-link">MangolControllersRotationStateModel</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolControllersScalebarOptions.html" data-type="entity-link">MangolControllersScalebarOptions</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolControllersTileloadOptions.html" data-type="entity-link">MangolControllersTileloadOptions</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolControllersZoomDictionary.html" data-type="entity-link">MangolControllersZoomDictionary</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolControllersZoomOptions.html" data-type="entity-link">MangolControllersZoomOptions</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolLayerGroupOptions.html" data-type="entity-link">MangolLayerGroupOptions</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolLayerOptions.html" data-type="entity-link">MangolLayerOptions</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolReady.html" data-type="entity-link">MangolReady</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MangolState.html" data-type="entity-link">MangolState</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MeasureDictionary.html" data-type="entity-link">MeasureDictionary</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MeasureMode.html" data-type="entity-link">MeasureMode</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/OlxLayerLayerOptions.html" data-type="entity-link">OlxLayerLayerOptions</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/PrintDictionary.html" data-type="entity-link">PrintDictionary</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/PrintLayout.html" data-type="entity-link">PrintLayout</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/PrintSize.html" data-type="entity-link">PrintSize</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-1.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-2.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-3.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-4.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-5.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-6.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-7.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-8.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-9.html" data-type="entity-link">State</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
