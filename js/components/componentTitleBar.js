const componentTitleBar =
{
    props:
    {
        title:
        {
            type: String
        }
    },

    template: `
    <!-- style="position:sticky;top:64px;" -->
        <div  class="blue lighten-5 d-flex">
            <div class="pa-1 blue lighten-3"></div>
            <div class="pa-1 font-weight-bold">{{title}}</div>
        </div>
    `
}