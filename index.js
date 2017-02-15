/**
 * @file   mofron-comp-menu/index.js
 * @author simpart
 */
require('mofron-event-click');

/**
 * @class Menu
 * @brief menu component for mofron
 */
mofron.comp.Menu = class extends mofron.Component {
    
    constructor (prm, opt) {
        try {
            super(prm);
            this.name('Menu');
            
            this.sel_evt = function(){};
            this.sel_idx = null;
            
            if (null !== opt) {
                this.option(opt);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts (prm) {
        try {
            this.target(this.vdom());
            
            if (null !== prm) {
                if ('object' !== (typeof prm)) {
                    throw new Error('invalid parameter');
                }
                for (var idx in prm) {
                    this.addChild(prm[idx]);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    selectIndex (idx) {
        try {
            if (undefined === idx) {
                return this.sel_idx;
            }
            if ('number' !== (typeof idx)) {
                throw new Error('invalid parameter : ' + idx);
            }
            this.sel_idx = idx;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    selectEvent (evt) {
        try {
            if (undefined === evt) {
                /* getter */
                return this.sel_evt;
            }
            /* setter */
            if ('function' !== (typeof evt)) {
                throw new Error('invalid parameter');
            }
            this.sel_evt = evt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild(comp, disp) {
        try {
            super.addChild(comp, disp);
            comp.addEvent(
                new mofron.event.Click(function(evt) {
                    try {
                        var menu   = evt[0];
                        var item   = evt[1];
                        var chdlen = menu.getChild();
                        for (var idx in chdlen) {
                            if (chdlen[idx].vdom().getChild(0).getId() === item.vdom().getChild(0).getId()) {
                                menu.selectIndex(parseInt(idx));
                                break;
                            }
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },[this,comp])
            );
            comp.addEvent(
                new mofron.event.Click(this.sel_evt,this)
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
