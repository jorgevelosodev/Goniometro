import React from "react";

const NotificationsContent = () => {
  return (
    <div className="content-wrapper">
      {/* Content */}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
          <div className="col-md-12">
            <ul className="nav nav-pills flex-column flex-md-row mb-3">
              <li className="nav-item">
                <a className="nav-link active" style={{ cursor: "default" }} href="#">
                  <i className="bx bx-bell me-1"></i> Notificações
                </a>
              </li>
            </ul>
            <div className="card">
              {/* Notifications */}
              <h5 className="card-header">Recent Devices</h5>
              <div className="card-body">
                <span>
                  We need permission from your browser to show notifications.{" "}
                  <span className="notificationRequest">
                    <strong>Request Permission</strong>
                  </span>
                </span>
                <div className="error"></div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-borderless border-bottom">
                  <thead>
                    <tr>
                      <th className="text-nowrap">Type</th>
                      <th className="text-nowrap text-center">✉️ Email</th>
                      <th className="text-nowrap text-center">🖥 Browser</th>
                      <th className="text-nowrap text-center">👩🏻‍💻 App</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { type: "New for you", ids: [1, 2, 3] },
                      { type: "Account activity", ids: [4, 5, 6] },
                      { type: "A new browser used to sign in", ids: [7, 8, 9] },
                      { type: "A new device is linked", ids: [10, 11, 12] },
                    ].map((row, index) => (
                      <tr key={index}>
                        <td className="text-nowrap">{row.type}</td>
                        {row.ids.map((id) => (
                          <td key={id}>
                            <div className="form-check d-flex justify-content-center">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`defaultCheck${id}`}
                                defaultChecked={id !== 9 && id !== 11 && id !== 12}
                              />
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card-body">
                <h6>When should we send you notifications?</h6>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="row">
                    <div className="col-sm-6">
                      <select id="sendNotification" className="form-select" name="sendNotification">
                        <option defaultValue>Only when I'm online</option>
                        <option>Anytime</option>
                      </select>
                    </div>
                    <div className="mt-4">
                      <button type="submit" className="btn btn-primary me-2">
                        Save changes
                      </button>
                      <button type="reset" className="btn btn-outline-secondary">
                        Discard
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              {/* /Notifications */}
            </div>
          </div>
        </div>
      </div>
      {/* / Content */}
      <div className="content-backdrop fade"></div>
    </div>
  );
};

export default NotificationsContent;
