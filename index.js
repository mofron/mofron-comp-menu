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
     * @param prm_opt (object) menu element array
     * @param prm_opt (object) option
     */
    constructor (po) {
        try {
            super();
            this.name('Menu');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * selected initialize menu item
     * add contents switch
     *
     * @note private method
     */
    afterRender () {
        try {
            super.afterRender();
            /* selected initialize menu item */
            if (null !== this.select()) {
                this.item()[this.select()].eventTgt().getRawDom().click();
            }
            /* add contents switch */
            let sel_evt = (evt_mnu, evt_idx) => {
                try {
                    let conts   = evt_mnu.contents();
                    let swh_cmp = null;
                    for (let cidx in conts) {
                        
                        swh_cmp = ('string' === typeof conts[cidx]) ? mf.func.objkey(conts[cidx]) : conts[cidx];
                        swh_cmp.visible(
                            (evt_idx == cidx) ? true : false
                        );
                        
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            };
            this.selectEvent(sel_evt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * menu width setter/getter
     */
    width (prm) {
        try {
            let ret = super.width(prm);
            if (undefined === ret) {
                /* setter */
                let siz = this.sizeValue('width');
                let chd = this.child();
                for (let cidx in chd) {
                    if (true === this.horiz()) {
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
     * menu height setter/getter
     */
    height (prm) {
        try {
            let ret = super.height(prm);
            if (undefined === ret) {
                /* setter */
                let siz = this.sizeValue('height');
                let chd = this.child();
                for (let cidx in chd) {
                    if (true === this.horiz()) {
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
     * set/unset horizontal mode
     * menu item is added in the horizontal direction if p1 setted true
     *
     * @param p1 (boolean) set/unset horizontal mode
     */
    horiz (flg) {
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
     * select menu item, selected menu item index
     *
     * @param p1 (number) select menu item index
     * @param p1 (undefined) call as selected index getter
     * @param p2 (boolean) it doesn't execute select event (only item click) when it setted false.
     * @return (number)  selected menu item index
     */
    select (idx, flg) {
        try {
            idx = (null === idx) ? -1 : idx;
            let ret = this.member('select', 'number', idx, 0);
            if ( (undefined !== idx) && (false === flg) ) {
                if (-1 !== idx) {
                    this.item()[idx].eventTgt().getRawDom().click();
                } else {
                    let itm = this.item();
                    for (let iidx in itm) {
                        if (true === mf.func.isComp(itm[iidx], 'MenuItem')) {
                            itm[iidx].select((iidx == idx) ? true : false);
                        }
                    }
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
     * @param p1 (function) select event function
     * @param p1 (undefined) call as getter
     * @param p2 (mixed) select event parameter
     * @return (array) select event [[function, parameter], ...]
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
     * add menu item
     * add click event to item
     *
     * @note private method
     */
    addItem(prm) {
        try {
            let ret = this.addChild(prm);
            let clk = (clk1_cmp, clk2, clk3) => {
                try {
                    let chd = clk3.item();
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
     * menu item setter/getter
     *
     * @param p1 (Component) add menu item
     * @param p1 (array) add menu item ([Component,...])
     * @param p1 (undefined) call as getter
     * @return (array) menu item ([Component,...])
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
     * set menu item offset of position
     * 
     * @param p1 (string) offset value (css size)
     */
    offset (prm) {
        try {
            this.layout([
                new Relat(
                    (true === this.horizon()) ? 'left' : 'top',
                    prm
                )
            ]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * contents component setter/getter
     *
     * @param p1 (Component) add contents
     * @param p1 (string) objkey of contents
     * @param p1 (array) add contents array (Component, string, both)
     * @param p1 (undefined) call as getter
     * @return (array) contents (Component array)
     * @attention content is not included in the menu child component.
     */
    contents (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_conts) ? [] : this.m_conts;
            }
            /* setter */
            if (true === Array.isArray(prm)) {
                for (let pidx in prm) {
                    this.contents(prm[pidx]);
                }
                return;
            }
            if ( (false === mf.func.isInclude(prm, 'Component')) &&
                 ('string' !== typeof prm) ) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_conts) {
                this.m_conts = [];
            }
            this.m_conts.push(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.Menu;
/* end of file */
