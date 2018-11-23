$(function() {
  var currentPage = 1; //当前页
  var pageSize = 5; //每页条数
  render();

  function render() {
    //一进入页面，发送 Ajax,进行渲染
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },

      dataType: "json",
      success: function(info) {
        console.log(info);
        var htmlStr = template("secondTpl", info);
        $("tbody").html(htmlStr);

        // 进行分页初始化
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3, //版本号
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size),
          //给每个页码添加点击事件
          onPageClicked: function(a, b, c, page) {
            //更新当前页，并且重新渲染
            currentPage = page;
            render();
          }
        });
      }
    });
  }
});
