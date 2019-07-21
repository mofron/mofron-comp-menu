/**
 * @file mofron-comp-menu/index.js
 * @brief menu component for mofron 
 * @feature configure the displayed contents when users click the menu by "contents" parameter
 *          "horizon" parameter is config that is horizontal menu item or vertical menu item
 * @author simpart
 */
const mf    = require("mofron");
const Click = require("mofron-event-click");
const Relat = require("mofron-layout-relative");

mf.comp.Menu = class extends mf.Component {
    /**
     * initialize menu component
     *
     * @param (array/object) array: menu item component list
     *                       object: component option
     * @pmap item
     * @type private
     */
    constructor (po) {
        try {
            super();
            this.name("Menu");
            this.prmMap("item");
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     *
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
            this.layout(new Relat({ value: "0px", tag: "Menu" }));
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * init size
     *
     * @type private
     */
    beforeRender () {
        try {
            super.beforeRender();
            let chd = this.child();
            /* set width */
            if (null !== this.width()) {
                let wid = mf.func.getSize(this.width());
                if ( (true === this.horizon()) && (0 !== chd.length) ) {
                    wid.value(wid.value()/chd.length);
                }
                for (let cidx in chd) {
                    chd[cidx].width(wid.toString());
                }
            }
            /* set height */
            if (null !== this.height()) {
                let hei = mf.func.getSize(this.height());
                if ( (true !== this.horizon()) && (0 !== chd.length) ) {
                    hei.value(hei.value()/chd.length);
                }
                for (let cidx in chd) {
                    chd[cidx].height(hei.toString());
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * selected initialize menu item
     * add contents switch
     *
     * @type private
     */
    afterRender () {
        try {
            super.afterRender();
            /* select defalut index */
            if (undefined !== this.item()[this.select()]) {
                this.item()[this.select()].eventTgt().getRawDom().click();
                let evt = this.selectEvent();
                for (let eidx in evt) {
                    evt[eidx][0](this, this.select(), evt[eidx][1]);
                }
                this.select(this.select());
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set/unset horizontal mode
     * menu item is added in the horizontal direction if p1 setted true
     *
     * @param (boolean) set/unset horizontal mode
     * @type parameter
     */
    horizon (flg) {
        try {
            if (undefined === flg) {
                /* getter */
                return ('flex' === this.style('display')) ? true : false;
            } else {
                /* setter */
                this.style({ 'display' : (true === flg) ? 'flex' : null });
                let relat = this.layout(["Relative", "Menu"]);
                if (null === relat) {
                    return;
                }
                relat.type((true === flg) ? "left" : "top");
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * select menu item
     *
     * @param (number) select menu item index
     * @return (number) selected menu item index
     * @type parameter
     */
    select (idx) {
        try {
            if ("number" === typeof idx) {
                if (idx !== this.select()) {
                    let evt = this.selectEvent();
                    for (let eidx in evt) {
                        evt[eidx][0](this, idx, evt[eidx][1]);
                    }
                }
                if (undefined !== this.contents()[idx]) {
                    let conts = this.contents();
                    this.contents()[this.select()].visible(
                        false,
                        () => {
                            try { conts[idx].visible(true); } catch (e) {
                                console.error(e.stack);
                                throw e;
                            }
                        }
                    );
                }
            }
            return this.member("select", "number", idx, 0);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * select event
     *
     * @param (function) select event function
     * @param (mixed) select event parameter
     * @return (array) select event [[function, parameter], ...]
     * @type parameter
     */
    selectEvent (fnc, prm) {
        try {
            if ( (undefined !== fnc) && ("function" !== typeof fnc)) {
                throw new Error("invalid parameter");
            }
            return this.arrayMember(
                "selectEvent",
                "object",
                (undefined !== fnc) ? [fnc, prm] : undefined
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * menu item
     *
     * @param (array/component) menu items
     * @return (array) menu items
     * @type parameter
     */
    item (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.arrayMember("item", "Component");
            }
            /* setter */
            if (true === Array.isArray(prm)) {
                for (let pidx in prm) {
                    this.item(prm[pidx]);
                }
                return;
            }
            let menu = this;
            let clk = (cp1, cp2, cp3) => {
                try {
                    let itm = menu.item();
                    for (let iidx in itm) {
                        if (cp1.getId() === itm[iidx].getId()) {
                            menu.select(parseInt(iidx));
                        }
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            prm.option({
                event: new Click(clk), mainColor: this.mainColor(),
                baseColor: this.baseColor(), accentColor: this.accentColor()
            });
            this.child([prm]);
            this.arrayMember("item", "Component", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * offset position of menu item
     * 
     * @param (string (size)) offset value
     * @type parameter
     */
    offset (prm) {
        try {
            let relat = this.layout(["Relative", "Menu"]);
            return (null !== relat) ? relat.value(prm) : null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * contents component
     *
     * @param (string/component/array) string: objkey of contents
     *                                 component: component object
     *                                 array: objkey(name) or component list
     * @return (array) component object list
     * @type parameter
     */
    contents (prm) {
        try {
            if (undefined === prm) {
                return this.arrayMember("contents");
            }
            if (true === Array.isArray(prm)) {
                for (let pidx in prm) {
                    this.contents(prm[pidx]);
                }
                return; 
            }
            if ("string" === typeof prm) {
                prm = mf.objkey[prm];
            }
            if (0 !== this.contents().length) {
                prm.visible(false);
            }
            this.arrayMember("contents", "Component", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * main color of items
     *
     * @param (string/array) string: color text
     *                       array: [r,g,b,[a]]
     *                       array: [color text, option]
     * @param (string) color text
     * @type parameter
     */
    mainColor (prm) {
        try {
            if (undefined === prm) {
                return this.m_mnclr;
            }
            /* setter */
            let itm = this.item();
            for (let iidx in itm) {
                itm[iidx].mainColor(prm);
            }
            this.m_mnclr = ("string" === typeof prm) ? [prm, undefined] : prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * base color of items
     *
     * @param (string/array) string: color text
     *                       array: [r,g,b,[a]]
     *                       array: [color text, option]
     * @param (string) color text
     * @type parameter
     */
    baseColor (prm) {
        try {
            if (undefined === prm) {
                return this.m_bsclr;
            }
            /* setter */
            let itm = this.item();
            for (let iidx in itm) {
                itm[iidx].baseColor(prm);
            }
            this.m_bsclr = ("string" === typeof prm) ? [prm, undefined] : prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * accent color of items
     *
     * @param (string/array) string: color text
     *                       array: [r,g,b,[a]]
     *                       array: [color text, option]
     * @param (string) color text
     * @type parameter
     */
    accentColor (prm) {
        try {
            if (undefined === prm) {
                return this.m_acclr;
            }
            /* setter */
            let itm = this.item();
            for (let iidx in itm) {
                itm[iidx].accentColor(prm);
            }
            this.m_acclr = ("string" === typeof prm) ? [prm, undefined] : prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.Menu;
/* end of file */
