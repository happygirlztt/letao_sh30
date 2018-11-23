$(function() {
  var currentPage =1; //当前页
  var pageSize = 5; //每页条数
  //发送ajax请求，请求一级分类的数据，进行页面渲染
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(info) {
        console.log(info);
        var htmlStr = template("firstTpl", info);
        $("tbody").html(htmlStr);

        // 当数据回来后，进行分页初始化
        $("#paginator").bootstrapPaginator({
          // 指定版本号
          bootstrapMajorVersion: 3,
          // 指定当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),
          // 绑定页码点击事件
          onPageClicked: function(a, b, c, page) {
            // console.log(page);

            // 更新 currentPage
            currentPage = page;

            // 重新渲染
            render();
          }
        });
      }
    });
  }
});
