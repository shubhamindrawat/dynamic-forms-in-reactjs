import React from 'react';
import './css/main.css';

export default class DyamicForm extends React.Component {
    state = {
        data: []
    }

    onSubmit = (e) => {
        e.preventDefault();  // To Prevent Other Action 
        if (this.props.onSubmit) {
            console.log( JSON.stringify(this.state,null, 2));
            alert('Form Submitted Successfully...!');
            document.getElementById("frm").reset();
        }
    }
    onChange = (e, label, type, quesKey) => {
        if (e.target.value !== "null") {
            const dataIndex = this.state.data.findIndex((item) => {
                return item.hasOwnProperty(quesKey)
            })
            let questions = this.state.data.filter((item) => item.hasOwnProperty(quesKey) ? false : true)
            let selectedQuestion = dataIndex > -1 ? this.state.data[dataIndex][quesKey] : { question: label, answer: [] }

            if (type === "multipleChoice") {
                const index = selectedQuestion.answer.indexOf(e.target.value)
                index > -1 ? selectedQuestion.answer.splice(index, 1) : selectedQuestion.answer.push(e.target.value)
            } else {
                selectedQuestion = { question: label, answer: e.target.value }
            }

            questions.push({ [quesKey]: selectedQuestion })
            this.setState({
                data: [...questions]
            })
        }
    }

    renderForm = () => {

        return this.props.ModelData.map((m) => {
            let props = m.props;

            switch (m.type) {

                case ('textbox'):
                    return (
                        <div className="input_field" key={"row" + m.key}>

                            <label
                                key={"lbl" + m.key}
                                htmlFor={m.key} >
                                {m.key + ". " + m.label}
                            </label>

                            <input {...props}
                                style={{width:'100%', height:'35px', marginTop: '5px', color:'#7b7b7b'}}
                                ref={(key) => { this[m.key] = m.key }}
                                key={"txt" + m.key}
                                type={m.type}
                                required={m.required}
                                onChange={(e) => { this.onChange(e, m.label, m.type, m.key) }}
                            />
                        </div>
                    );

                case ('dropDown'):
                    return (
                        <div key={m.key} className="input_field select_option">
                            <label
                                key={"lbl" + m.key}
                                htmlFor={m.key} >
                                {m.key + ". " + m.label}
                            </label>

                            <select key={"drop" + m.key} onChange={(e) => { this.onChange(e, m.label, m.type, m.key) }} required={m.required} style={{width:'100%', height:'35px', marginTop: '5px'}}>
                                <option key={"ddl" + m.key + "Default"} value={"null"} >Select Language</option>
                                {m.choices.map(function (data) {
                                    return (
                                        <option key={"ddl" + m.label + data.keydrop} value={data.value} >{data.value}</option>
                                    )
                                })}
                            </select>
                            <div className="select_arrow" key={"row" + m.key} style={{positiom:'relative', marginTop: '20px'}}></div>
                        </div>
                    );
                case ('multipleChoice'):
                    return (
                        <div key={m.key} className="input_field" style={{padding : '10px 0px 10px 0px'}} >
                            <label
                                key={"lbl" + m.key}
                                htmlFor={m.key} >
                                {m.key + ". " + m.label}
                            </label>
                            <div>
                                {m.choices.map(function (data) {
                                    return (
                                        <div key={m.key + "_option" + data.chkindex} className="chkOptions" >
                                            <label key={"lbl" + m.key + data.chkindex} style={{color: '#7b7b7b'}}>
                                                <input type="checkbox" onChange={(e) => { this.onChange(e, m.label, m.type, m.key) }} name={"chk" + m.key} value={data.value} key={"chk" + m.key + "" + data.chkindex} />
                                                {data.value}
                                            </label>
                                        </div>
                                    )
                                }, this)}
                            </div>
                        </div>
                    );

                case ('StarRating'):
                    return (
                        <div key={m.key} style={{padding : '10px 0px 10px 0px'}} >
                            <label
                                key={"lbl" + m.key}
                                htmlFor={m.key} >
                                {m.key + ". " + m.label}
                            </label>
                            <div key={"rbl_" + m.key} className="">
                                {m.choices.map(function (data) {
                                    return (
                                        <label  key={"lbl" + m.key + data} htmlFor={"rb" + m.key + "" + data} style={{color: '#7b7b7b'}}>
                                            <input type="radio" onChange={(e) => { this.onChange(e, m.label, m.type, m.key) }} value={data} name={"rb" + m.key} key={"rb" + m.key + "" + data} required={m.required} />
                                            {data}
                                        </label>
                                    )
                                }, this)}
                            </div>
                        </div>
                    )
                default:
                    return (
                        <div key={m.key} className="input_field">
                            <label
                                key={"lbl" + m.key}
                                htmlFor={m.key} >
                                {m.key + ". \"" + m.type + "\" is not a valid type of control"}
                            </label>
                        </div>
                    );
            }
        });
    }
    render() {
        let Title = this.props.title || "Programmer Survey";
        return (
            <div className="form_wrapper">
                <div className="form_container">
                    <div className="title_container">
                        <h2 className="form-title">{Title}</h2>
                    </div>
                    <div>
                        <form id="frm" onSubmit={(e) => { this.onSubmit(e) }}>
                            {this.renderForm()}
                            <input type="submit" className="button" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}