/*******************TEST CODE*******************

DECLARE @PageIndex int = 0
		,@PageSize int = 10

EXECUTE [dbo].[Files_SelectAll]
		@PageIndex
		,@PageSize


***********************************************/
CREATE PROC [dbo].[Files_SelectAll]
			@PageIndex int
			,@PageSize int
AS

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT [F].[Id]
		  ,[F].[Name]
		  ,[Url]
		  ,[FileTypeId] as 'fileTypeId'
		  ,[FT].Name as 'FileTypeName'
		  ,[IsDeleted]
		  ,[CreatedBy]
		  ,[DateCreated]
		  ,[TotalCount] = COUNT(1) OVER()

	  FROM [dbo].[Files] as F inner join [dbo].[FileTypes] as FT
	  ON F.FileTypeId = FT.Id

	  ORDER BY F.Id

		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY

END
GO
