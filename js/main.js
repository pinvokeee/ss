const App = 
{
    components:
    {
        jobSelecter, infoInputForm
    },

    data()
    {
        return {
            jobManager: new JobManager()
        }
    },

    mounted()
    {
        this.jobManager.load(jobData);
    },

    methods:
    {
        
    },

    template: `
        <!-- <div class="container"> -->
            <nav class="navbar navbar-dark bg-dark sticky-top">
                <div class="container-fluid">
                        <span class="navbar-brand" href="#">{{jobManager.title}}</span>
                        <!-- <button @click="attack" class="btn btn-success" v-bind:disabled="!isEnabledOutputButton">{{isEnabledOutputButton ? "チェック結果を出力" : "未入力・未選択の項目があります"}}</button> -->
                </div>
            </nav>

            <div class="container-fluid p-3">
                <div class="row">
                    <div class="col-6">
                        <jobSelecter v-bind="{ jobManager }">
                        </jobSelecter>
                    </div>
                </div>

                <div class="row">           
                    <div class="col-6">         
                        <infoInputForm v-bind="{ jobManager }">
                        </infoInputForm>
                    </div>
                </div>     
            </div>
        <!-- </div> -->

   
    `
}