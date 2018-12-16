/**
 * @file   mofron-comp-menu/index.js
 * @author simpart
 */
const mf     = require('mofron');
const Click  = require('mofron-event-click');
const Relat  = require('mofron-layout-relative');

/**
 * @class Menu
 * @brief menu component for mofron
 */
mf.comp.Menu = class extends mf.Component {
    /**
     * initialize menu component
     *
     * @param p1 (Component) menu element array
     * @param p1 (object) component option
     */
    constructor (po) {
        try {
            super();
            this.name('Menu');
            this.prmMap('item');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize select
     *
     * @note private method
     */
    afterRender () {
        try {
            super.afterRender();
            if (null !== this.selectIndex()) {
                this.item()[this.selectIndex()].eventTgt().getRawDom().click();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * width setter/getter
     */
    width (prm) {
        try {
            let ret = super.width(prm);
            if (undefined === ret) {
                /* setter */
                let siz = this.sizeValue('width');
                let chd = this.child();
                for (let cidx in chd) {
                    if (true === this.horizon()) {
                        chd[cidx].width(
                            (siz.value() / this.child().length) + siz.type()
                        );
                    } else {
                        chd[cidx].width(this.width());
                    }
                }
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * height setter/getter
     */
    height (prm) {
        try {
            let ret = super.height(prm);
            if (undefined === ret) {
                /* setter */
                let siz = this.sizeValue('height');
                let chd = this.child();
                for (let cidx in chd) {
                    if (true === this.horizon()) {
                        chd[cidx].height(this.height());
                    } else {
                        chd[cidx].height(
                            (siz.value() / this.child().length) + siz.type()
                        );
                    }
                }
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * horizon config
     *
     * @param p1 (true)  set horizon position
     * @param p1 (false) set vertical positon
     * @return (boolean) position flag
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
     * select index setter/getter
     *
     * @param p1 (number) select index
     * @param p1 (null) release select
     * @param p1 (undefined) call as getter
     * @param p2 (boolean) event flag
     * @return (number) selected index
     */
    selectIndex (idx, flg) {
        try {
            idx = (null === idx) ? -1 : idx;
            let ret = this.member('selectIndex', 'number', idx, 0);
            if ( (undefined !== idx) && (false === flg) ) {
                if (-1 !== idx) {
                    this.item()[idx].eventTgt().getRawDom().click();
                } else {
                    this.execSelect(null); 
                }
            }
            return (-1 === ret) ? null : ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * select event setter/getter
     *
     * @param p1 (function) event function
     * @param p2 (mix) function parameter
     * @return (array) [ function, parameter ]
     */
    selectEvent (evt, prm) {
        try {
            if (undefined === evt) {
                /* getter */
                return (undefined === this.m_selevt) ? [] : this.m_selevt;
            }
            /* setter */
            if ('function' !== (typeof evt)) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_selevt) {
                this.m_selevt = [];
            }
            this.m_selevt.push([evt, prm]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * execute select event
     *
     * @note private method
     */
    execSelect (idx) {
        try {
            let evt = this.selectEvent();
            for (let eidx in evt) {
                evt[eidx][0](this, idx, evt[eidx][1]);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * add menu item component
     */
    addItem(prm) {
        try {
            let ret = this.addChild(prm);
            let clk = (clk1_cmp, clk2, clk3) => {
                try {
                    let chd = clk3.child();
                    for (let cidx in chd) {
                        if (clk1_cmp.getId() === chd[cidx].getId()) {
                            clk3.execSelect(parseInt(cidx));
                        }
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            prm.execOption({ event : [ new Click(new mf.Param(clk, this)) ] });
            this.arrayMember('item', 'Component', prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * menu item component setter/getter
     *
     */
    item (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.arrayMember('item', 'Component');
            }
            /* setter */
            if (true === Array.isArray(prm)) {
                for (let pidx in prm) {
                    this.addItem(prm[pidx]);
                }
                return;
            }
            this.addItem(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * menu item offset of position
     *
     * @param p1 (string) css size value
     */
    offset (prm) {
        try {
            this.layout([
                new Relat((true === this.horizon()) ? 'left' : 'top', prm) 
            ]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.Menu;
/* end of file */
