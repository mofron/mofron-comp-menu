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
                if (true === this.horizon()) {
                    wid.value(wid.value()/chd.length);
                }
                for (let cidx in chd) {
                    chd[cidx].width(wid.toString());
                }
            }
            
            /* set height */
            if (null !== this.height()) {
                let hei = mf.func.getSize(this.height());
                if (true !== this.horizon()) {
                    hei.value(hei.value()/chd.length);
                }
                for (let cidx in chd) {
                    chd[cidx].height(hei.toString());
                }
            }
            
            /* set offset */
            if (null !== this.offset()) {
                this.layout([
                    new Relat((true === this.horizon()) ? "left" : "top", prm)
                ]);
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
            if (undefined !== this.item()[this.select()]) {
                this.item()[this.select()].eventTgt().getRawDom().click();
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
     * @note p2 : event flag (undefined/false is not execute select event)
     */
    select (idx, flg) {
        try {
            if ("number" === typeof idx) {
                if (true === flg) {
                    let evt = this.selectEvent();
                    for (let eidx in evt) {
                        evt[eidx][0](this, idx, evt[eidx][1]);
                    }
                }
                if (undefined !== this.contents()[idx]) {
                    let conts = this.contents();
                    for (let cidx in conts) {
                        conts[cidx].visible(false);
                    }
                    conts[idx].visible(true);
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
                            menu.select(parseInt(iidx), true);
                        }
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            prm.option({ event: new Click(clk) });
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
            if (undefined !== prm) {
                mf.func.getSize(prm);
            }
            return this.member("offset", "string", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * contents component
     *
     * @param (string/array) objkey of contents
     * @return (array) objkey of contents
     * @type parameter
     */
    contents (prm) {
        try {
            if (undefined !== prm) {
                mf.objkey[prm].visible(false);
            }
            return this.arrayMember("contents", "string", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.Menu;
/* end of file */
