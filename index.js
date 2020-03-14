/**
 * @file mofron-comp-menu/index.js
 * @brief menu component for mofron 
 * @feature configure the displayed contents when users click the menu by "contents" parameter
 *          "horizon" parameter is config that is horizontal menu item or vertical menu item
 * @license MIT
 */
const Click = require("mofron-event-click");
const Relat = require("mofron-layout-relative");
const comutl = mofron.util.common;

module.exports = class extends mofron.class.Component {
    /**
     * initialize menu component
     *
     * @param (mixed) item parameter
     *                object: component option
     * @short item
     * @type private
     */
    constructor (prm) {
        try {
            super();
            this.name("Menu");
            this.shortForm("item");
            
	    /* init config */
	    this.confmng().add("item", { type: "Component", list: true });
	    this.confmng().add("select", { type: "number", init: 0 });
            this.confmng().add("selectEvent", { type: "event", list: true });
            this.confmng().add("mainColor", { type: "color" });
	    this.confmng().add("baseColor", { type: "color" });
            this.confmng().add("accentColor", { type: "color" });
	    this.confmng().add("mainColor_opt", { type: "object" });
            this.confmng().add("baseColor_opt", { type: "object" });
            this.confmng().add("accentColor_opt", { type: "object" });
            
	    /* set config */
	    if (undefined !== prm) {
                this.config(prm);
            }
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
            /* set color */
            let itm = this.item();
            for (let iidx in itm) {
	        if (null !== this.mainColor()) {
                    itm[iidx].mainColor(
		        this.mainColor(),
			(null === this.confmng("mainColor_opt")) ? undefined : this.confmng("mainColor_opt")
                    );
		}
		if (null !== this.baseColor()) {
		    itm[iidx].baseColor(
		        this.baseColor(),
			(null === this.confmng("baseColor_opt")) ? undefined : this.confmng("baseColor_opt")
	            );
		}
		if (null !== this.accentColor()) {
		    itm[iidx].accentColor(
		        this.accentColor(),
			(null === this.confmng("accentColor_opt")) ? undefined : this.confmng("accentColor_opt")
		    );
		}
	    }
            
            /* set width */
	    let wid = comutl.getsize(this.width());
            if (null !== wid) {
	        if ((true === this.horizon()) && (0 !== itm.length)) {
                    wid.value(wid.value()/itm.length);
		}
	        for (let widx in itm) {
                    itm[widx].width(wid.toString());
		}
            }
            /* set height */
	    let hei = comutl.getsize(this.height());
            if (null !== hei) {
                if ( (true !== this.horizon()) && (0 !== itm.length) ) {
                    hei.value(hei.value()/itm.length);
                }
                for (let hidx in itm) {
                    itm[cidx].height(hei.toString());
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
            /* defalut selected */
            if (undefined !== this.item()[this.select()]) {
                this.item()[this.select()].eventDom().getRawDom().click();
                let evt = this.selectEvent();
                for (let eidx in evt) {
                    evt[eidx][0](this, this.select(), evt[eidx][1]);
                }
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
     * @return (boolean) horizontal mode status
     * @type parameter
     */
    horizon (flg) {
        try {
            if (undefined === flg) {
                /* getter */
                return ('flex' === this.style('display')) ? true : false;
            }
            /* setter */
            this.style({ 'display' : (true === flg) ? 'flex' : null });
            let relat = this.layout({ name: "Relative", tag: "Menu" });
            if (null === relat) {
                return;
            }
            relat.type((true === flg) ? "left" : "top");
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
            if (undefined === idx) {
                /* getter */
                return this.confmng("select");
	    }
	    /* setter */
            if (idx !== this.select()) {
                this.confmng("select", idx);
		let evt = this.selectEvent();
		for (let eidx in evt) {
                    evt[eidx][0](this, idx, evt[eidx][1]);
		}
	    }
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
	    return this.confmng("selectEvent", fnc, prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * menu item
     *
     * @param (mixed) component: menu items component
     *                array: menu items list
     * @return (array) menu items list
     * @type parameter
     */
    item (prm, opt) {
        try {
	    if (undefined === prm) {
	        /* getter */
	        return this.confmng("item", prm);
            }
            /* setter */
            if (true === Array.isArray(prm)) {
                for (let pidx in prm) {
                    this.item(prm[pidx], opt);
                }
                return;
            }
            let menu = this;
            let clk  = (cp1, cp2, cp3) => {
                try {
                    let itm = menu.item();
                    for (let iidx in itm) {
                        if (cp1.id() === itm[iidx].id()) {
                            menu.select(parseInt(iidx));
                        }
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            prm.config({ event: new Click(clk) });
	    if (undefined !== opt) {
                prm.config(opt);
	    }
            this.child(prm);
	    this.confmng("item", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * offset position of menu item
     * 
     * @param (string(size)) offset value
     * @return (string(size)) offset value
     * @type parameter
     */
    offset (prm) {
        try {
            let relat = this.layout({ name: "Relative", tag: "Menu" });
            return (null !== relat) ? relat.value(prm) : null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * main color of items
     *
     * @param (mixed) string: menu item color name, #hex
     *                array: [red, green, blue, (alpha)]
     * @param (option) style option
     * @return (string) menu item main color
     * @type parameter
     */
    mainColor (prm, opt) {
        try {
	    this.confmng("mainColor_opt", opt);
	    return this.confmng("mainColor", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * base color of items
     *
     * @param (mixed) string: color name, #hex
     *                array: [red, green, blue, (alpha)]
     * @param (option) style option
     * @return (string) menu item base color
     * @type parameter
     */
    baseColor (prm, opt) {
        try {
	    this.confmng("baseColor_opt", opt);
	    return this.confmng("baseColor", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * accent color of items
     *
     * @param (mixed) string: color name, #hex
     *                array: [red, green, blue, (alpha)]
     * @param (option) style option
     * @return (string) menu item accent color
     * @type parameter
     */
    accentColor (prm, opt) {
        try {
	    this.confmng("accentColor_opt", opt);
	    return this.confmng("accentColor", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
