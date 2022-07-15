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
                    <div class="container-fluid col-6">
                        <div class="row">
                            <div class="col">
                                <jobSelecter v-bind="{ jobManager }">
                                </jobSelecter>
                            </div>
                        </div>
                        <div class="row h-75 overflow-auto">
                            <div class="col">
                            <infoInputForm v-bind="{ jobManager }">
                            </infoInputForm>
                            </div>
                        </div>
                    </div>

                    <div class="container-fluid col-6">
                    </div>
                </div>

            </div>

            <!-- <div class="container-fluid p-3">
                <div class="row">
                    <div class="col-6">
                    </div>
                </div>
                    
                        <jobSelecter v-bind="{ jobManager }">
                        </jobSelecter>
                    </div>

                    <div class="row">
                        <infoInputForm v-bind="{ jobManager }">
                        </infoInputForm>
                    </div>

                </div>

                <div class="col-6">

                    <div class="row">
                        {{jobManager.selected?.subJob?.tips}}
                    </div>
                    
                    <div class="row">
                        <textarea class="col-6 form-control h-100" v-model="{{jobManager.selected?.freeSpace}}"></textarea>
                    </div>

                    
                </div> -->

            </div>

            <nav class="navbar fixed-bottom navbar-light bg-light">
            <div class="container-fluid">
                <div class="col-6 d-grid gap-2 d-flex">
                        <button class="col-3 btn btn-primary" type="button">出力</button>
                        <button class="col-3 btn btn-danger" type="button">クリア</button>
                </div>
            </div>
            </nav>
        <!-- </div> -->

   
    `
}