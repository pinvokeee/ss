const jobSelecter = 
{
    props:
    {
        jobManager:
        {
            type: Object
        }
    },

    data()
    {
        return {
        }
    },

    computed:
    {
        selectedJob:
        {
            get()
            {
                return this.jobManager.selected.job;
            },

            set(value)
            {
                this.jobManager.selected.job = value;
                this.jobManager.selected.subJob = null;
            }
        },

        selectedSubJob:
        {
            get()
            {
                return this.jobManager.selected.subJob;
            },

            set(value)
            {
                this.jobManager.selected.subJob = value;
            }
        }
    },

    template: `
        <div>
            <div class="row mb-3">
                <label class="col-2 col-form-label">メイン</label>
                <div class="col-10">
                    <select class="form-select" v-model="selectedJob">
                        <option value="null" disabled selected style='display:none;'>--選択してください--</option>
                        <option v-for="job in jobManager.jobs" :key="job.ID" :value="job">{{job.name}}</option>
                    </select>
                </div>
            </div>

            <div class="mb-3 row">
                <label class="col-2 col-form-label">サブ</label>
                <div class="col-10">
                    <select class="form-select" v-model="selectedSubJob" :disabled="selectedJob == null || selectedJob.subJobs.length == 0">
                    <option value="null" disabled selected style='display:none;'>--選択してください--</option>
                        <option v-if="selectedJob != null" v-for="subJob in selectedJob.subJobs" :key="subJob.ID" :value="subJob">{{subJob.name}}</option>
                    </select>
                </div>
            </div>
        </div>
    `
}