//=============================================================================
// SVキャラのモーションを拡張するプラグイン
// FTKR_ExSvMotion.js
// 作成者     : フトコロ
// 作成日     : 2017/04/19
// 最終更新日 : 
// バージョン : v1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_ESM = true;

var FTKR = FTKR || {};
FTKR.ESM = FTKR.ESM || {};

//=============================================================================
/*:
 * @plugindesc v1.0.0 SVキャラのモーションを拡張するプラグイン
 * @author フトコロ
 *
 * @param --基本設定--
 * @default
 * 
 * @param Motion Speed
 * @desc モーションスピードを設定します
 * デフォルト 12
 * @default 12
 * 
 * @param --モーション1 設定--
 * @default
 * 
 * @param Motion 1 name
 * @desc モーション1のコードを設定します。
 * デフォルト abnormal
 * @default abnormal
 * 
 * @param Motion 1 Condition
 * @desc モーション1の状態を設定します。
 * デフォルト state1
 * @default state1
 * 
 * @param --モーション2 設定--
 * @default
 * 
 * @param Motion 2 name
 * @desc モーション2のコードを設定します。
 * デフォルト guard
 * @default guard
 * 
 * @param Motion 2 Condition
 * @desc モーション2の状態を設定します。
 * デフォルト guard
 * @default guard
 * 
 * @param --モーション3 設定--
 * @default
 * 
 * @param Motion 3 name
 * @desc モーション3のコードを設定します。
 * デフォルト chant
 * @default chant
 * 
 * @param Motion 3 Condition
 * @desc モーション3の状態を設定します。
 * デフォルト chant
 * @default chant
 * 
 * @param --モーション4 設定--
 * @default
 * 
 * @param Motion 4 name
 * @desc モーション4のコードを設定します。
 * デフォルト sleep
 * @default sleep
 * 
 * @param Motion 4 Condition
 * @desc モーション4の状態を設定します。
 * デフォルト state2
 * @default state2
 * 
 * @param --モーション5 設定--
 * @default
 * 
 * @param Motion 5 name
 * @desc モーション5のコードを設定します。
 * デフォルト dead
 * @default dead
 * 
 * @param Motion 5 Condition
 * @desc モーション5の状態を設定します。
 * デフォルト state3
 * @default state3
 * 
 * @param --モーション6 設定--
 * @default
 * 
 * @param Motion 6 name
 * @desc モーション6のコードを設定します。
 * @default 
 * 
 * @param Motion 6 Condition
 * @desc モーション6の状態を設定します。
 * @default 
 * 
 * @param --モーション7 設定--
 * @default
 * 
 * @param Motion 7 name
 * @desc モーション7のコードを設定します。
 * @default 
 * 
 * @param Motion 7 Condition
 * @desc モーション7の状態を設定します。
 * @default 
 * 
 * @param --モーション8 設定--
 * @default
 * 
 * @param Motion 8 name
 * @desc モーション8のコードを設定します。
 * @default 
 * 
 * @param Motion 8 Condition
 * @desc モーション8の状態を設定します。
 * @default 
 * 
 * @param --モーション9 設定--
 * @default
 * 
 * @param Motion 9 name
 * @desc モーション9のコードを設定します。
 * デフォルト walk
 * @default walk
 * 
 * @param Motion 9 Condition
 * @desc モーション9の状態を設定します。
 * デフォルト input
 * @default input
 * 
 * 
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインを実装することで、アクターのさまざまな状態における
 * SVキャラのモーションを変更します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法
 *-----------------------------------------------------------------------------
 * 1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
 *    ください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * モーションの設定
 *-----------------------------------------------------------------------------
 * アクターの以下の状態におけるモーション設定します。
 * 
 *  input  : 入力中
 *  chant  : 詠唱中
 *  guard  : 防御中/防御待機中
 *  state* : ステート付加中 (*)がステートモーション番号
 * 
 * モーションは、モーション1～モーション9まで設定できます。
 * 数字が大きい方が、モーションの優先度が高くなります。
 * 
 * <Motion * Name>
 *    :モーション名のコードを指定してください。
 *    : walk, wait, chant, guard, damage, evade, thrust, swing,
 *    : missile, skill, spell, item, escape, victory, dying,
 *    : abnormal, sleep, dead
 * 
 * <Motion * Condition>
 *    :モーションの状態。上記の4種類から設定してください。
 * 
 * 
 *-----------------------------------------------------------------------------
 * ステートモーションの設定
 *-----------------------------------------------------------------------------
 * ステートのメモ欄に以下のタグを入力することで、ステート付加中のモーションを
 * 設定できます。
 * 
 * <ESM モーション: x>
 *    :ステートモーション番号を x に設定します。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.0.0 - 2017/04/19 : 初版作成
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================

//=============================================================================
// プラグイン パラメータ
//=============================================================================
FTKR.ESM.parameters = PluginManager.parameters('FTKR_ExSvMotion');

FTKR.ESM.motion = {
    speed:Number(FTKR.ESM.parameters['Motion Speed'] || 0),
    state:[
        {name:'', condition:'',},
        {name:String(FTKR.ESM.parameters['Motion 1 name'] || ''),
         condition:String(FTKR.ESM.parameters['Motion 1 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 2 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 2 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 3 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 3 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 4 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 4 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 5 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 5 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 6 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 6 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 7 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 7 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 8 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 8 Condition'] || ''),},
        {name:String(FTKR.ESM.parameters['Motion 9 name'] || ''),
          condition:String(FTKR.ESM.parameters['Motion 9 Condition'] || ''),},
    ],
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

//書き換え
Game_BattlerBase.prototype.stateMotionIndex = function() {
    var states = this.states();
    if (states.length > 0) {
        var motion = states[0].meta[('esm モーション').toUpperCase()] ||
            states[0].meta[('esm motion').toUpperCase()];
        return motion ? Number(motion) : states[0].motion;
    } else {
        return 0;
    }
};

//=============================================================================
// Sprite_Actor
//=============================================================================

//書き換え
Sprite_Actor.prototype.motionSpeed = function() {
    return FTKR.ESM.motion.speed;
};

//書き換え
Sprite_Actor.prototype.refreshMotion = function() {
    var actor = this._actor;
    var motionGuard = Sprite_Actor.MOTIONS['guard'];
    if (actor) {
        if (this._motion === motionGuard && !BattleManager.isInputting()) {
                return;
        }
        var index = this.checkConditions();
        if (index) {
            this.startMotion(FTKR.ESM.motion.state[index].name);
        } else if (actor.isDying()) {
            this.startMotion('dying');
        } else if (actor.isUndecided()) {
            this.startMotion('walk');
        } else {
            this.startMotion('wait');
        }
    }
};

Sprite_Actor.prototype.checkConditions = function() {
    for(var i = 9; i > 0; i--) {
        if(this.checkCondition(FTKR.ESM.motion.state[i].condition)) {
            return i;
        }
    }
    return 0;
};

Sprite_Actor.prototype.checkCondition = function(condition) {
    var actor = this._actor;
    var stateMotion = actor.stateMotionIndex();
    if (condition.match(/state(\d+)/i)) {
        return stateMotion === Number(RegExp.$1);
    } 
    switch(true) {
        case /imput/i.test(condition):
            return actor.isInputting() || actor.isActing();
        case /guard/i.test(condition):
            return actor.isGuard() || actor.isGuardWaiting();
        case /chant/i.test(condition):
            return actor.isChanting();
        default:
            return false;
    };
};