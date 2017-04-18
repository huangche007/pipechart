/**
 * Created by hc on 2017/3/20.
 */
function Histogram(option){
    this._init(option);
}
Histogram.prototype = {
    _init: function (option) {
      this.x = option.x === 0 ? 0 : option.x;
      this.y = option.y === 0 ? 0 : option.y;
      this.width = option.width || 0;
      this.height = option.height || 0;
      this.rectWidth = option.rectWidth || 0;
      this.data = option.data;
      this.layer = option.layer;
        //绘制底线
        var baseLine = new Konva.Line({
            points:[this.x,this.y,this.x+this.width,this.y],
            strokeWidth:1,
            stroke:"lightgreen",
        });

        this.layer.add(baseLine);
        var that = this;
        this.data.forEach(function (item,index) {

            //绘制矩形
            var rect = new Konva.Rect({
                x:(1/4+index)*(that.rectWidth)+that.x,
                y:y0-item.value*that.height,
                width: that.rectWidth/2,
                height:item.value*that.height,
                fill:item.color,
                cornerRadius:10,
                opacity:.8
            });
            that.layer.add(rect);

            //绘制上面的文字
            var textTop = new Konva.Text({
                x:(1/4+index)*(that.rectWidth)+that.x-that.rectWidth/4,
                y:y0-item.value*height - 14,
                width:that.rectWidth,
                align:"center",
                text:item.value*100+"%",
                fill:item.color,
                fontSize:14,
                name:'topText'
            });

            that.layer.add(textTop);
            var group =new Konva.Group({
                x:(1/4+index)*(that.rectWidth)+that.x,
                y:that.y,
            });
            //绘制下面的文字
            var textBottom = new Konva.Text({
                x:0,
                y:0,
                width:that.rectWidth,
                text:item.name,
                fill:item.color,
                fontSize:14,
                rotation:60,
            });
            group.add(textBottom);
            that.layer.add(group);

        });
        this.layer.draw();

    },

    addToStage: function (stage) {
        stage.add(this.layer);
    },
    mAnimate: function (stage) {
        var that = this;
        stage.on("contentClick", function () {
            //首先获取到所有的矩形和文字
            layer.find("Rect").each(function (item,index) {
                //先让矩形的高度和y变为默认
                item.y(that.y);
                item.height(0);

                item.to({
                    duration: 1,
                    y:that.y-that.data[index].value*that.height,
                    height:that.data[index].value*that.height,
                });
            })

            //上边的文字,通过类名获取
            layer.find(".topText").each(function (item,index) {
                item.y(that.y-14);
                item.to({
                    duration: 1,
                    y:that.y-that.data[index].value*that.height - 14
                });
            });
        });

    },
}