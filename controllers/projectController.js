import Project from "../models/project.js";
import Status from "../models/status.js";
import {
  handleResponseError,
  handleResponseNotFound,
  handleResponseUpdateSuccess,
} from "../utils/handleResponse.js";

export const SendManagerOrder = async (req, res) => {
  const {
    id,
    no_refrensi,
    no_identifikasi,
    no_surat,
    tanggal_mulai,
    tanggal_selesai,
    keterangan_to_client,
  } = req.body;
  try {
    const project = await Project.findByPk(id);

    if (!project) {
      return handleResponseNotFound(res);
    }

    if (project.id === id) {
      await Project.update(
        {
          no_refrensi,
          no_identifikasi,
          no_surat,
          tanggal_mulai,
          tanggal_selesai,
          keterangan_to_client,
        },
        {
          where: { id },
        }
      );
      await Status.update(
        {
          is_send_manager: '1',
        },
        { where: { id } }
      );
      return handleResponseUpdateSuccess(res);
    } else {
      return handleResponseNotFound(res);
    }
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};

export const SendToFronlineOrder = async (req, res) => {
  const { id, status_persetujuan, keterangan_to_client } = req.body;
  try {
    const project = await Project.findByPk(id);

    if (!project) {
      return handleResponseNotFound(res);
    }

    if (project.id === id) {
      await Project.update(
        {
          keterangan_to_client,
        },
        {
          where: { id },
        }
      );
      await Status.update(
        {
          status_persetujuan,
        },
        { where: { id } }
      );
      return handleResponseUpdateSuccess(res);
    } else {
      return handleResponseNotFound(res);
    }
  } catch (error) {
    console.log(error);
    return handleResponseError(res);
  }
};
